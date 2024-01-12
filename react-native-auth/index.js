require('dotenv').config();
require('./models/User');
require('./models/GoogleUser');
const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const session = require("express-session");
const cors = require('cors');

const connectDB = require('./db/connect')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/authRouter');
app.use(authRoutes)


const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    } catch (error) {
      console.error('Error starting the server:', error);
    }
  };
  
start();