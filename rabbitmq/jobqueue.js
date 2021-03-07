const amqp = require('amqplib/callback_api');
const {EventEmitter} = require('events');
const config = require('../config');
let jobQ = 'job_queue';
let successQ = 'success_queue';
let jobChannel;
let successListener = new EventEmitter();
console.log(
  'connecting to rabbitmq at      ',
  `amqp://${config.AMQP.USER}:${config.AMQP.PASS}@${config.AMQP.HOST}:${config.AMQP.PORT}`
);
amqp.connect(
  `amqp://${config.AMQP.USER}:${config.AMQP.PASS}@${config.AMQP.HOST}:${config.AMQP.PORT}`,
  (err, connection) => {
    if (err) throw err;
    connection.createChannel((err, channel) => {
      if (err) throw err;
      jobChannel = channel;
      channel.assertQueue(jobQ, {durable: true});
      channel.assertQueue(successQ, {durable: true});
      channel.consume(successQ, (msg) => {
        const payload = JSON.parse(msg.content.toString());
        let eventName;
        switch (payload.scenario) {
          case 'run':
            eventName = 'runResult';
            break;
          case 'submit':
            eventName = 'submitResult';
            break;
        }
        successListener.emit(eventName, payload);
        channel.ack(msg);
      });
    });
  }
);
const queueJob = (job, queueName = jobQ) => {
  return jobChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(job)), {
    persistent: true,
  });
};
module.exports = {queueJob, successListener};
