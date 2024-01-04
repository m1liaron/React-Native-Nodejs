require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = mongoose.model('User')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = new User({ email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      let testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
              user: testAccount.user,
              pass: testAccount.pass,
          },
      });

      let message = {
          from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
          to: "bar@example.com, baz@example.com",
          subject: "Hello ✔",
          text: "Successful Register with us.",
          html: "<b>Successful Register with us.</b>",
      };

      // Send the email
      let info = await transporter.sendMail(message);

      return res.status(201).json({
          msg: "You should receive an email",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
          token: token, // Send the token in the response
      });

  } catch (error) {
      console.error(error);
      return res.status(402).send(error.message);
  }
});


router.post('/signin', async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        console.log("Wrong password or email!")
        return res.status(422).send("please provide email and password")
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send("please provide email and password")
    }

    try {
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
        res.send({token})
    } catch (error) {
        return res.status(422).send("please provide email and password")
    }
})

async function generateCode (length) {
  let result = "";
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ8123456789'
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}  

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found.');
    }

    const resetToken = await generateCode(5);

    user.resettoken  = resetToken;
    user.resettokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    let config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    }

    const transporter = nodemailer.createTransport(config);

    // Use sendMail correctly with proper parameters
    const message = {
      from: '"Your App" <noreply@example.com>',
      to: user.email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(message);

    res.send({success: true, message:'Email sent'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
});


router.post('/reset-password', async (req, res) => {
  try {
    const { email, password, verificationCode } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).send('User not found.');
    }
    
    if (!user || user.resettoken !== verificationCode) {
      return res.status(400).send({ success: false });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update the password and reset token fields

    user.password = hashedPassword;
    user.resettoken = '';
    user.resettokenExpiration = null;

    
    await user.save();
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
    res.send({success: true, token})
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;