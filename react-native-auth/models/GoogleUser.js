const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const googleUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      displayName: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
      },
})

mongoose.model('GoogleUser', googleUserSchema);