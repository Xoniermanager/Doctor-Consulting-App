const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter your name'],
        maxlength : [30, 'Name can not exceed 30 characters'],
        minlength : [3, 'Name should have more than 3 characters']
    },
    username : {
        type : String,
        required : [true, 'Please enter username'],
        maxlength : [30, 'Username can not exceed 30 characters'],
        minlength : [6, 'Username should have more than 6 characters']
    },
    email : {
        type : String,
        required : [true, 'Please enter your email'],
        unique : true,
        validate : [validator.isEmail, 'Please enter a valid email']
    },
    password : {
        type : String,
        required : [true, 'Please enter your password'],
        minlength : [8, 'Name should have more than 8 character'],
        select : false
    },
    role : {
        type : String,
        default : 'user'
    },
    createdAt :{
        type : Date,
        default : Date.now
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
});

// password encrypted
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// jwt token 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_Expire
    })
}
// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
//Generating Reset password token 
userSchema.methods.getResetPasswordToken = function(){
    // Generating token 
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHas('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('users', userSchema);