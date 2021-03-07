const {Router} = require('express');
const {runPOST, onSuccess} = require('../handlers/run');
const {successListener} = require('../rabbitmq/jobqueue');
const langValidator = require('../middlewares/langValidator');

const router = Router();
// const validator = new Validator();
// 1 apply validator.POST    2 apply langValidator()
router.post('/', runPOST);
successListener.on('runResult', onSuccess);

module.exports = router;
