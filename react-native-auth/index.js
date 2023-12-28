require('dotenv').config();
require('./models/User');
const express = require('express');
const bodyParser = require('body-parser');
const requireToken = require('./midlleware/requireToken');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;




const authRoutes = require('./routes/authRouter');
app.use(bodyParser.json());
app.use(authRoutes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongo')
})

mongoose.connection.on('error', (err) => {
    console.log('this is error ', err)
})



app.get('/', requireToken, (req, res)=> {
    res.send("your email is " + req.user.email)
})

app.listen(PORT, () => {
    console.log('Server is listening on port 3000...')
})