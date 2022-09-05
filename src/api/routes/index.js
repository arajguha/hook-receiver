const express = require('express');
const messageRouter = require('./message.route');

const router = express.Router();

router.route('/status').get((req, res, next) => res.send('API is up.'));
router.use('/message', messageRouter);

module.exports = router;