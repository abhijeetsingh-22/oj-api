const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URI,
  {keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true},
  () => console.log('OJ Database Connected')
);

module.exports.Submission = require('./submission');
module.exports.Lang = require('./lang');
