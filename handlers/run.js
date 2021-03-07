const db = require('../models');
const {queueJob} = require('../rabbitmq/jobqueue');
const axios = require('axios');

const RunPool = {};

const runPOST = async (req, res) => {
  const mode = req.body.mode || 'sync';
  const job = await db.Submission.create({
    lang: req.body.lang,
    startTime: new Date(),
    mode,
    callback: req.body.callback,
  });
  console.log('run request');
  await queueJob(job);
  if (['callback', 'poll'].includes(mode)) return res.json({id: job.id});
  // if mode === 'sync'
  RunPool[job.id] = {
    res,
  };
};
const onSuccess = async (result) => {
  const job = await db.Submission.findById(result.id);
  job.results = result;
  await job.save();
  switch (job.mode) {
    case 'callback':
      await axios.post(job.callback, result);
      break;
    case 'sync':
      RunPool[job.id].res.json(result);
      break;
  }
};

module.exports = {runPOST, onSuccess};
