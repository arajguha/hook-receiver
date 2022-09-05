const express = require('express');
const controller = require('../controllers/message.controller');
const { validateSendMessage } = require('../utils/message.validation');

const router = express.Router();
router.route('/send').post(validateSendMessage, controller.sendMessage);

module.exports = router;