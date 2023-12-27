const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const { mongoUrl } = require('./keys')



require('./models/User');
app.use(bodyParser.json());



mongoose.connect(mongoUrl, {
    useNewUrlParser: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongo')
})

mongoose.connection.on('error', (err) => {
    console.log('this is error ', err)
})


app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello')
})

app.listen(PORT, () => {
    console.log('Server is listening on port 3000...')
})