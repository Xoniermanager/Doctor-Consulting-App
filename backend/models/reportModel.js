const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    doctorName : {
        type : String,
        required : [true, 'Doctor name is required']
    },
    reportDate : {
        type : String,
        required : [true, 'Report date is required']
    },
    diagnosis : {
        type : String,
        required : [true, 'Diagnosis is required']
    },
    patientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    document : {
        public_id : String,
        url :String
    },
    createdAt : {
        type : Date,
        default : Date.now
    } 
});

module.exports = mongoose.model('Report', reportSchema);


