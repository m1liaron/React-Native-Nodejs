require('dotenv').config();
require('./models/User');
const passport = require('passport')
const express = require('express');
const bodyParser = require('body-parser');
const requireToken = require('./midlleware/requireToken');
const mongoose = require('mongoose');
const session = require("express-session")
// require('./auth');
const app = express();
const PORT = 3000;

// function isLoggedIn(req, res, next){
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         res.sendStatus(401);
//     }
// }


// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());  
// app.use(passport.session());


// app.get('/', (req, res)=> {
//     res.send('<a href="/auth/google">Authentication with google</a>')
// }) 

const authRoutes = require('./routes/authRouter');
app.use(bodyParser.json());
app.use(authRoutes)

// app.get('/auth/google', 
//     passport.authenticate('google', { scope: ['email', 'profile']})
// )

// app.get("/auth/google/callback", 
//     passport.authenticate('google', {
//       successRedirect: '/protected',
//       failureRedirect: '/auth/failure'
//     }),
//     function (req, res) {
//         console.log(req.user); // Log the user information
//     }
// )

// app.get('/protected', isLoggedIn, (req, res) => {
//     res.send(`Hello ${req.user.displayName}`);
// })

// app.get('/auth/failure', (req, res) => {
//     res.send('something went wrong')
// })


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})

mongoose.connection.on('error', (err) => {
    console.log('this is error ', err)
})

app.get('/', requireToken, (req, res)=> {
    res.send({email: req.user.email})
})

app.listen(PORT, () => {
    console.log('Server is listening on port 3000...')
})