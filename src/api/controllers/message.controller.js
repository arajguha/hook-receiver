const httpStatus = require('http-status');
const { v4: uuid } = require('uuid');
const { sendMessageToQueue } = require('../../config/rabbitmq');


// TODO: add loggers
const sendMessage = async (req, res, next) => {
    console.log('inside send message controller');
    try {
        const { message } = req.body;
        const queueData = {
            message,
            messageId: uuid(),
            receivedAt: Date.now()
        };
        sendMessageToQueue(queueData);
        res.status(httpStatus.OK).send({ status: true, message: 'message delivered' });

    } catch (error) {
        console.log('error in sendMessage ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: false,
            error
        });
    }
};

module.exports = { sendMessage };