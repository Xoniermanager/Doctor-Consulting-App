const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    doctorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    patientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    diagnosticSummary : {
        type : String,
        required : [true, 'Diagnostic summary is required']
    },
    drugs:[
        {
            drugId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Drug'
             },
            drugType : String,
            drugStrength : String,
            drugDose : String,
            drugDuration : String,
            drugAdvice : String,
        }
    ],
    tests:[
        {
            testId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Test'
             },
             testDescription : String
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    } 
});

module.exports = mongoose.model('Prescription', prescriptionSchema);

