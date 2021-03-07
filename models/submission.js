const mongoose = require('mongoose');

const submissionSchema=new mongoose.Schema({
    lang:{type:String,maxlength:10},
    startTime:{type:Date},
    endTime:{type:Date},
    mode:{type:String,required:true},
    results:{type:JSON},
    callback:{type:String}
},{timestamps:true})


const Submission=mongoose.model('submission',submissionSchema)
module.exports =Submission