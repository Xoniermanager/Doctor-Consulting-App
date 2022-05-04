const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Disease = require('../models/diseaseModel');
const Faq = require("../models/faqModel")
const Department = require('../models/departmentModel');
const News = require('../models/newsModel');
const cloudinary = require('cloudinary');
const { sendEmail } = require('../middleware/sendEmail');

 // all users
 exports.getPatients = catchAsyncErrors(async( req, res) => {
  try {
     const adminPatients = await User.find({ role: req.params.userType});
     res.status(200).json({
         success : true,
         adminPatients
     });
   } catch (error) {
     res.status(500).json({
       success : false,
       message : error.message
    })
   }
});


  // add create patient
  exports.createDoctor = catchAsyncErrors(async( req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const {userValue, certificate} = req.body;
        const password = 'Xonier@'+Math.floor(1000 + Math.random() * 9000);
        const doctorData = userValue;
        doctorData.password = password;
        if(certificate){
          const myCloud = await cloudinary.v2.uploader.upload(certificate, {
            folder: "certificate",
          });
          doctorData.certificate = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
          doctorData.status = 0;
       }
        const doctor = await User.create(doctorData);
        await user.save();
      const message = `Your login credential is given below: \n\n Email : ${doctorData.email} \n\n Password : ${doctorData.password}`;
      try {
        await sendEmail({
          email: doctorData.email,
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
            message : 'Doctor added successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });

  // create disease
  exports.createDisease = catchAsyncErrors(async( req, res) => {
    try {
        const diseaseData = {
          ...req.body,
          owner : req.user._id,                
        }
        const newDisease =  await Disease.create(diseaseData);
        res.status(201).json({
            success : true,
            newDisease,
            message : 'Disease added successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });


    // Update disease
    exports.updateDisease = catchAsyncErrors(async( req, res) => {
      try {
        const disease = await Disease.findById(req.params.id);
          
        if(!disease){
            return res.status(404).json({
                success : false,
                message : 'Disease not found'
            })
        }
  
        if(disease.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success : false,
                message : 'Unauthorised'
            })
        }
        
        if(req.body.diseaseName){
          disease.diseaseName = req.body.diseaseName;
        }
        if(req.body.diseaseDescription){
          disease.diseaseDescription = req.body.diseaseDescription;
        }        
        await disease.save();
  
          res.status(201).json({
              success : true,
              message : 'Disease updated successfully.'
          });
        } catch (error) {
          res.status(500).json({
            success : false,
            message : error.message
        })
        }
    });

    // get diseases details
    exports.getDiseases = catchAsyncErrors(async( req, res) => {
      try {
        //{owner : req.user._id}
         const diseases = await Disease.find();
         if(!diseases){
            return res.status(404).json({
                success : false,
                message : 'No diseases found'
            });
         }
         res.status(200).json({
             success : true,
             diseases
         });
       } catch (error) {
         res.status(500).json({
           success : false,
           message : error.message
        })
       }
    });


  // get disease details by id
  exports.getDiseaseDetails = catchAsyncErrors(async( req, res) => {
    try {
        //owner : req.user._id,
        const disease = await Disease.findOne({ _id : req.params.id});
        if(!disease){
          return res.status(404).json({
              success : false,
              message : 'No disease found'
          });
        }
        res.status(200).json({
            success : true,
            disease
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });

  // detele disease
    exports.deleteDisease = catchAsyncErrors(async( req, res) => {
    try {
      const disease = await Disease.findById(req.params.id);
        if(!disease){
            return res.status(404).json({
                success : false,
                message : 'Disease not found'
            })
        }

        if(disease.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success : false,
                message : 'Unauthorised'
            })
        }
      await disease.remove();
        res.status(200).json({
            success : true,
            message : 'Disease deleted successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });


     // Update user status
     exports.updateUserStatus = catchAsyncErrors(async( req, res) => {
      try {
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }
        user.status = !user.status;
         await user.save();
          res.status(201).json({
              success : true,
              message : 'Status updated successfully.'
          });
        } catch (error) {
          res.status(500).json({
            success : false,
            message : error.message
        })
        }
    });

    // create Department
  exports.createDepartment = catchAsyncErrors(async( req, res) => {
    try {
      const {departmentName, departmentDescription, deptIcon} = req.body;
        const departmentData = {
          departmentName,
          departmentDescription,
        }
        if(deptIcon && Object.keys(deptIcon).length !== 0){
          const myCloud = await cloudinary.v2.uploader.upload(deptIcon.icon, {
            folder: "department",
          });
          departmentData.icon = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
      }
      const newDepartment =  await Department.create(departmentData);
      res.status(201).json({
            success : true,
            newDepartment,
            message : 'Department added successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
       })
      }
  });


    // Update Department
    exports.updateDepartment = catchAsyncErrors(async( req, res) => {
      try {
        const department = await Department.findById(req.params.id);
        const {departmentName, departmentDescription, deptIcon} = req.body;
        if(!department){
            return res.status(404).json({
                success : false,
                message : 'Department not found'
            })
        }
        if(departmentName){
          department.departmentName = departmentName;
        }
        if(departmentDescription){
          department.departmentDescription = departmentDescription;
        }   
        if(deptIcon && Object.keys(deptIcon).length !== 0){
           if(department)
           await cloudinary.v2.uploader.destroy('department/'+department.icon.public_id);
          const myCloud = await cloudinary.v2.uploader.upload(deptIcon, {
            folder: "department",
          });
          department.icon = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
      }    

        await department.save();
          res.status(201).json({
              success : true,
              message : 'Department updated successfully.'
          });
        } catch (error) {
          res.status(500).json({
            success : false,
            message : error.message
        })
        }
    });

    // get departments details
    exports.getDepartments = catchAsyncErrors(async( req, res) => {
      try {
        //{owner : req.user._id}
         const departments = await Department.find();
         if(!departments){
            return res.status(404).json({
                success : false,
                message : 'No departments found'
            });
         }
         res.status(200).json({
             success : true,
             departments
         });
       } catch (error) {
         res.status(500).json({
           success : false,
           message : error.message
        })
       }
    });


  // get department details by id
  exports.getDepartmentDetails = catchAsyncErrors(async( req, res) => {
    try {
        const department = await Department.findOne({ _id : req.params.id});
        if(!department){
          return res.status(404).json({
              success : false,
              message : 'No department found'
          });
        }
        res.status(200).json({
            success : true,
            department
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });

  // detele department
    exports.deleteDepartment = catchAsyncErrors(async( req, res) => {
    try {
      const department = await Department.findById(req.params.id);
        if(!department){
            return res.status(404).json({
                success : false,
                message : 'Department not found'
            })
        }
      await department.remove();
        res.status(200).json({
            success : true,
            message : 'Department deleted successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });


   // create Faq
   exports.createFaq = catchAsyncErrors(async( req, res) => {
    try {
        const faqData = {
          ...req.body              
        }
        const newFaq =  await Faq.create(faqData);
        res.status(201).json({
            success : true,
            newFaq,
            message : 'Faq added successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });


    // Update faq
    exports.updateFaq = catchAsyncErrors(async( req, res) => {
      try {
        const faq = await Faq.findById(req.params.id);
          
        if(!faq){
            return res.status(404).json({
                success : false,
                message : 'Faq not found'
            })
        }
        if(req.body.faqQues){
          faq.faqQues = req.body.faqQues;
        }
        if(req.body.faqDescription){
          faq.faqDescription = req.body.faqDescription;
        }        
        await faq.save();
  
          res.status(201).json({
              success : true,
              message : 'Faq updated successfully.'
          });
        } catch (error) {
          res.status(500).json({
            success : false,
            message : error.message
        })
        }
    });

    // get faqs details
    exports.getFaqs = catchAsyncErrors(async( req, res) => {
      try {
         const faqs = await Faq.find();
         if(!faqs){
            return res.status(404).json({
                success : false,
                message : 'No faqs found'
            });
         }
         res.status(200).json({
             success : true,
             faqs
         });
       } catch (error) {
         res.status(500).json({
           success : false,
           message : error.message
        })
       }
    });


  // get faq details by id
  exports.getFaqDetails = catchAsyncErrors(async( req, res) => {
    try {
        //owner : req.user._id,
        const faq = await Faq.findOne({ _id : req.params.id});
        if(!faq){
          return res.status(404).json({
              success : false,
              message : 'No faq found'
          });
        }
        res.status(200).json({
            success : true,
            faq
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });

  // detele faq
    exports.deletefaq = catchAsyncErrors(async( req, res) => {
    try {
      const faq = await Faq.findById(req.params.id);
        if(!faq){
            return res.status(404).json({
                success : false,
                message : 'faq not found'
            })
        }
      await faq.remove();
        res.status(200).json({
            success : true,
            message : 'Faq deleted successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });


   // create news
   exports.createNews = catchAsyncErrors(async( req, res) => {
    try {
        const {newsValue, newsImage} = req.body;
        const newsData = {...newsValue};
        if(newsImage){
         const myCloud = await cloudinary.v2.uploader.upload(newsImage, {
           folder: "news",
         });
         newsData.image = {
           public_id: myCloud.public_id,
           url: myCloud.secure_url,
         };
        }  
        const newNews =  await News.create(newsData);
        res.status(201).json({
            success : true,
            newNews,
            message : 'News added successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });


    // Update News
    exports.updateNews = catchAsyncErrors(async( req, res) => {
      try {
        const news = await News.findById(req.params.id);
        const {newsValue, newsImage} = req.body;
      
        if(!news){
            return res.status(404).json({
                success : false,
                message : 'News not found'
            })
        }
        if(newsValue.newsTitle){
          news.newsTitle = newsValue.newsTitle;
        }
        if(newsValue.newsDescription){
          news.newsDescription = newsValue.newsDescription;
        }        
        if(newsImage){
            if(news.image)
            await cloudinary.v2.uploader.destroy('news/'+news.image.public_id);
             const myCloud = await cloudinary.v2.uploader.upload(newsImage, {
             folder: "news",
            });
            news.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
      }
        await news.save();
  
          res.status(201).json({
              success : true,
              message : 'News updated successfully.'
          });
        } catch (error) {
          res.status(500).json({
            success : false,
            message : error.message
        })
        }
    });

    // get faqs details
    exports.getNewses = catchAsyncErrors(async( req, res) => {
      try {
         const newses = await News.find();
         if(!newses){
            return res.status(404).json({
                success : false,
                message : 'No news found'
            });
         }
         res.status(200).json({
             success : true,
             newses
         });
       } catch (error) {
         res.status(500).json({
           success : false,
           message : error.message
        })
       }
    });


  // get faq details by id
  exports.getNewsDetails = catchAsyncErrors(async( req, res) => {
    try {
        //owner : req.user._id,
        const news = await News.findOne({ _id : req.params.id});
        if(!news){
          return res.status(404).json({
              success : false,
              message : 'No news found'
          });
        }
        res.status(200).json({
            success : true,
            news
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });

  // detele faq
    exports.deleteNews = catchAsyncErrors(async( req, res) => {
    try {
      const news = await News.findById(req.params.id);
        if(!news){
            return res.status(404).json({
                success : false,
                message : 'news not found'
            })
        }
      await faq.remove();
        res.status(200).json({
            success : true,
            message : 'News deleted successfully.'
        });
      } catch (error) {
        res.status(500).json({
          success : false,
          message : error.message
      })
      }
  });

