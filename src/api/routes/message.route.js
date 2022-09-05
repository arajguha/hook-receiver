const express = require('express');
const controller = require('../controllers/message.controller');

const router = express.Router();
router.route('/send').post(controller.sendMessage);

module.exports = router;