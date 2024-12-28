const User = require('../models/user-model');


const home = async (req , res) => {
    try {
        res.status(200).send('This is the first page in controller');
    } catch (error) {
        console.log(error);
        
    }
} 

// register
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        console.log(req.body);

        // Check if user already exists
        const userExist = await User.findOne({ email }); // Pass an object with the email key

        if (userExist) {
            return res.status(400).json({ message: "User already exists" }); // Return to prevent further execution
        }

        // Create a new user
        const userCreated = await User.create({ username, email, phone, password });

        return res.status(200).json({ 
            mesg: "Registration successful", 
            token: await userCreated.genrateToken(),
            userId : userCreated._id.toString() 
        }); // Return successful response
    } catch (error) {
        console.error('Error:', error);
        next(error);
        // return res.status(500).json({ mesg: "Data couldn't save due to an error" }); // Error response
    }
};

//login

const login = async (req , res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        // Check if user already exists
        const userExist = await User.findOne({ email }); // Pass an object with the email key

        if (!userExist) {
            return res.status(400).json({ message: "User invalid credtials!" }); // Return to prevent further execution
        }

        // compare password in user model
        const user = await userExist.comparePassword(password);
        
        if(user)
        {
            return res.status(200).json({ 
                message: "Login successful", 
                token: await userExist.genrateToken(),
                userId : userExist._id.toString() 
            }); // Return successful response
        }else{
            return res.status(400).json({ 
                message: "Email or password Invalid!", 
            }); // Return successful response
        }
      
    } catch (error) {
        console.error('Error:', error);
        next(error);
        // return res.status(500).json({ mesg: "Data couldn't save due to an error" }); // Error response
    }
}


const user = async (req , res) => {
    console.log(req);
    try {
        const userData = await req.user;
        return res.status(200).json({msg: userData});
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

module.exports = { home , register , login , user};