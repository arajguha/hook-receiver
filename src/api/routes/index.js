const express = require('express');
const messageRouter = require('./message.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('API is up.'));
router.use('/message', messageRouter);

module.exports = router;