require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = mongoose.model('User')
const nodemailer = require('nodemailer');
const Joi = require('joi');
const crypto = require('crypto');

router.post('/signup',async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = new User({email, password});
        await user.save();
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
        res.send({token})
    } catch (error) {
       return res.status(402).send(error.message)
    }
})

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
  
router.post('/forgot-password', async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Update user document with reset token and expiration
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // Expires in 1 hour
    await user.save();

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      // Configure your email settings here
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: http://your-app-url/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.send('Password reset email sent.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
});

module.exports = router;