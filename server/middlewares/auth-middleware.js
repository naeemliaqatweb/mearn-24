const jwt = require('jsonwebtoken');
const User = require('../models/user-model');


const authMiddleware = async (req , res , next) => {
    const token = req.header("Authorization");
    
    if(!token)
        {
            return res.status(401).json({ message : "Unauthorize http token provider!"});
        }
        
        const jwtToken = token.replace("Bearer","").trim();

    try {
        const isVerify = jwt.verify(jwtToken , process.env.JWT_SECRET_KEY);
        
        const userData = await User.findOne({email : isVerify.email}).select('-password');

        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
        
    } catch (error) {
        
    }
}


module.exports = authMiddleware;