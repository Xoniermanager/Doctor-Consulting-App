const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const { sendEmail } = require('../middleware/sendEmail');
const crypto  = require('crypto');

// register user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
    try{
    const {name, email,  password} = req.body;
    const user = await User.create({
        name, email, password
    })

    const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/verify/email/${user._id}`;
  
      const message = `Verify Your account by clicking on the link below: \n\n ${resetUrl}`;
  
      try {
        await sendEmail({
          email: user.email,
          subject: "Verify email",
          message,
        });
  
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email}`,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    res.status(201).json({
        success : true,
        user
    })
   }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next)=>{
    const {email, password} = req.body;
     // checking user have given email and password both
     if(!email || !password){
        return next(new ErrorHandler("Please enter email or password", 400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid entered email or password", 401));
    }
    if(!user.isVerify){
        return next(new ErrorHandler("Please verify your email first", 401));
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


//  user profile
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

// verify user email
exports.verifyEmail = catchAsyncErrors(async (req, res, next)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {$set : {'isVerify':1}});
        res.status(200).json({
         success: true,
         message: 'Email is verified'
       });     
    } catch (error) {
       res.status(500).json({
         success: false,
         message: error.message,
       });
    }
 })

 // forget password
 exports.forgotPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const resetPasswordToken = user.getResetPasswordToken();
  
      await user.save();
  
      const resetUrl = `${req.protocol}://${req.get("host")}/reset-password`;
  
      const message = `Reset Your Password by clicking on the link below: \n\n Use this otp for reset password \n\n OTP : ${resetPasswordToken} \n\n <a href=${resetUrl}>Click here</a>`;
  
      try {
        await sendEmail({
          email: user.email,
          subject: "Reset Password",
          message,
        });
  
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email}`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
  
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // Reset password
  exports.resetPassword = async (req, res) => {
    try {
      const resetPasswordToken = req.body.otp;
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid or has expired",
        });
      }
  
      user.password = req.body.password;
  
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Password Updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  // update password
  exports.updatePassword = async (req, res) => {
    console.log(req.user);
    try {
      const user = await User.findById(req.user._id).select("+password");
  
      const { oldPassword, newPassword } = req.body;
  
      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Please provide old and new password",
        });
      }
  
      const isMatch = await user.comparePassword(oldPassword);
  
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect Old password",
        });
      }
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Password Updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };