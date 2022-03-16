const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const crypto  = require('crypto');

// register user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
    const {name, email, username, password} = req.body;
    const user = await User.create({
        name, email, username, password
    })
    const authToken  = user.getJWTToken();
    res.status(201).json({
        success : true,
        user,
        authToken
    })
})

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next)=>{
    const {username, password} = req.body;
     // checking user have given email and password both
     if(!username || !password){
        return next(new ErrorHandler("Please enter email or password", 400));
    }
    const user = await User.findOne({username}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid entered email or password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid entered email or password", 401));
    }
    const authToken  = user.getJWTToken();
    res.status(200).json({
        success : true,
        user,
        message: 'Login successfully',
        authToken
    })
})


// login user
exports.myProfile = catchAsyncErrors(async (req, res, next)=>{
   try {
       const user = await User.findById(req.user.id);
       res.status(200).json({
        success: true,
        user,
      });     
   } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
   }
})