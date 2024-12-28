const {z} = require('zod');

const signupSchema = z.object({
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
    
    phone : z
    .string({required_error: 'Phone is required'})
    .trim()
    .min(10,{message : 'Phone must be at least 10 char!'})
    .max(20 , {message : 'Phone must not be more then 20 char!'}),
    
    password : z
    .string({required_error: 'password is required'})
    .trim()
    .min(7,{message : 'password must be at least 7 char!'})
    .max(15 , {message : 'password must not be more then 15 char!'}),
    
});


const signinSchema = z.object({
    email : z
    .string({required_error: 'Email is required'})
    .trim()
    .email({message: 'Invalid email'})
    .min(3,{message : 'Email must be at least 3 char!'})
    .max(255 , {message : 'Email must not be more then 255 char!'}),
    
    password : z
    .string({required_error: 'password is required'})
    .trim()
    .min(7,{message : 'password must be at least 7 char!'})
    .max(15 , {message : 'password must not be more then 15 char!'}),
    
});

module.exports = {signupSchema , signinSchema};