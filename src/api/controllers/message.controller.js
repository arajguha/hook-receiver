const axios = require('axios');
const httpStatus = require('http-status');
const { v4: uuid } = require('uuid');
const { sendMessageToQueue } = require('../../config/rabbitmq');
const { backupService } = require('../../config/vars');
const logger = require('../utils/logger');


const sendMessage = async (req, res, next) => {
    logger.debug('inside send message controller');
    try {
        const { message } = req.body;
        const queueData = {
            message,
            messageId: uuid(),
            receivedAt: Date.now()
        };

        sendMessageToQueue(queueData);
        
        if (backupService.enabled) {
            try {
                await axios.post(`${backupService.baseUrl}/v1/backup-message`, 
                { ...queueData, message: JSON.stringify(message) }
                , {
                        headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                console.log('axios err ', err?.response?.data);
                logger.error('axios error ', err.message || JSON.stringify(err?.response?.data));
            }
        }

        res.status(httpStatus.OK).send({ status: true, message: 'message delivered' });

    } catch (error) {
        console.log('error in sendMessage ', error);
        logger.error('error in sendMessage ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: false,
            error
        });
    }
};

module.exports = { sendMessage };