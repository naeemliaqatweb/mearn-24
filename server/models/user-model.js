const mongoos = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const userSchema = new mongoos.Schema({
    username : {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    phone : {
        type: String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    isAdmin :{
        type:Boolean,
        default:false
    }
});

userSchema.pre('save' , async function(next) {
    const user = this;
    if(!user.isModified('password'))
    {
        next();
    }

    try {
        
    const passSalt = await bcrypt.genSalt(10);

    hash_password = await bcrypt.hash(user.password , passSalt);
    user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

// jwt genrate

userSchema.methods.genrateToken = async function()
{
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
    )
    } catch (error) {
        console.error(error);
        
    }
}

userSchema.methods.comparePassword = async function(password)
{
    return await bcrypt.compare(password , this.password);
}

const User = new mongoos.model('User' , userSchema);

module.exports  = User;