const mongoose = require('mongoose');

// Set the strictQuery option to false to prepare for the change in Mongoose 7
mongoose.set('strictQuery', false);

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;