const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const { sendEmail } = require('../middleware/sendEmail');
  // add create patient
  exports.createPatient = catchAsyncErrors(async( req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const password = 'Xonier@'+Math.floor(1000 + Math.random() * 9000);
        const patientData = req.body;
        patientData.password = password;
        const patient = await User.create(patientData);

      const message = `Your login credential is given below: \n\n Email : ${patientData.email} \n\n Password : ${patientData.password}`;
      try {
        await sendEmail({
          email: patientData.email,
          subject: "Login creadential",
          message,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }

        res.status(200).json({
            success : true,
            patient,
            message : 'Patient added successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });

    // add update language details
    exports.getPatient = catchAsyncErrors(async( req, res) => {
      try {
         const patient = await User.find({role:'patient'});
         res.status(200).json({
             success : true,
             patient
         });
       } catch (error) {
         res.status(500).json({
           success : false,
           message : error.message
        })
       }
    });