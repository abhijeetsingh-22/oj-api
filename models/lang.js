const mongoose = require('mongoose');

const langSchema = new mongoose.Schema(
  {
    langCode: {type: String, maxlength: 10,unique:true},

    langName: {type: String, required: true,maxlength:10},
    langVersion: {type: String,maxlength:5},
  },
  {timestamps: true}
);

const Lang = mongoose.model('lang', langSchema);
module.exports = Lang;
