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
    email : {
        type : String,
        required : [true, 'Please enter your email'],
        unique : true,
        validate : [validator.isEmail, 'Please enter a valid email']
    },
    password : {
        type : String,
        required : [true, 'Please enter your password'],
        minlength : [6, 'Password should have more than 6 character'],
        maxlength : [12, 'Password can not exceed 12 characters'],
        select : false
    },
    role : {
        type : String,
        default : 'patient'
    },
    isVerify : {
        type : Number,
        default : 0
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
    const resetToken = Math.floor(1000 + Math.random() * 9000);
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('users', userSchema);