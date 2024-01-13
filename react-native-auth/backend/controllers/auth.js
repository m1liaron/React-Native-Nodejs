const User = require('../models/User');

const singup = async (req, res) => {
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
}

const singin = async (req, res) => {
    
}

const generateCode = async (length) => {
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

const forgotPassword = async (req, res) => {
    
}

const reset_password = async (req, res) => {
    
}

const google_signup = async (req, res) => {
    
}
