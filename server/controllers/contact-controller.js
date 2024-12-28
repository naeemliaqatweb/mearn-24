const contactModel = require('../models/contact-model');

const contact = async (req , res) => {

    try {
        const {username , email , message} = req.body;
        await contactModel.create({username , email , message});
        return res.status(200).json({message: 'contact created successfully!'});
        
    } catch (error) {
        next(error);
        // return res.status(400).json({message: 'contact failed!'});
    }

}

module.exports = contact;