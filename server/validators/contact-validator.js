const {z} = require('zod');

const contactSchema = z.object({
    username : z
    .string({required_error: 'Name is required'})
    .trim()
    .min(3,{message : 'Name must be at least 3 char!'})
    .max(255 , {message : 'Name must not be more then 255 char!'}),
    
    email : z
    .string({required_error: 'Email is required'})
    .trim()
    .email({message: 'Invalid email'})
    .min(3,{message : 'Email must be at least 3 char!'})
    .max(255 , {message : 'Email must not be more then 255 char!'}),
    
    message : z
    .string({required_error: 'Message is required'})
    .trim()
    .min(3,{message : 'Message must be at least 3 char!'})
    .max(255 , {message : 'Message must not be more then 255 char!'}),
    

});

module.exports = contactSchema;