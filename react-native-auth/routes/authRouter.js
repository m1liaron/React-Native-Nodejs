require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = mongoose.model('User')
const nodemailer = require('nodemailer');
const Joi = require('joi');
const crypto = require('crypto');

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

      // Log the URL of the test message
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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
  let counter
  0;
  while (counter < length) {
    result + characters.charAt(Math.floor(Math.random() * charactersLength));
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

    const resetToken = generateCode(5)

    // Set the reset token and expiration time for the user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    let config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    }

    // Send the password reset email with a link ceontaining the token
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport(config);

    const message = {
      from: '"Your App" <noreply@example.com>',
      to: user.email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(message);
    res.send({ successful: true, message: 'Email sent'});
    console.log(resetLink)

    
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
});

router.patch('/reset-password', async(req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    await user.save()

    await sendEmail(email, `Here is your Reset Token ${resetToken}`)
    res.send({ successful: true, message: 'Email sent'});

  } catch (error) {
    console.error(error)
  }
})

module.exports = router;