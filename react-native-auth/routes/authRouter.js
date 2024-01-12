require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = mongoose.model('User')
const GoogleUser = mongoose.model('GoogleUser')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = new User({ email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.status(201).send(token)
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
        Please enter the code to input:\n\n
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

router.post('/google-signup', async (req, res) => {
  const { idToken  } = req.body;
  const {googleEmail, familyName, givenName, name, photo} = req.body.user

  console.log('Received Google Email:', googleEmail);

  try {
      const user = new GoogleUser({ googleEmail });
      
      if (!user) {
        // Create a new user for Google Sign-Up
        const newUser = new GoogleUser({ idToken, googleEmail, displayName: name, photo });
        await newUser.save();
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      
      res.status(201).send(token)
  } catch (error) {
      console.error(error);
      return res.status(402).send(error.message);
  }
});

// ! google

// const isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.sendStatus(401);
//   }
// };

// router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// router.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/protected',
//     failureRedirect: '/auth/failure',
//   }),
//   (req, res) => {
//     console.log(req.user); // Log the user information
//   }
// );

module.exports = router;