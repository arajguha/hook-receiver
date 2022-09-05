const httpStatus = require('http-status');
const { sendMessageToQueue } = require('../../config/rabbitmq');


// TODO: add loggers
const sendMessage = async (req, res, next) => {
    console.log('inside send message controller');
    try {
        const { message } = req.body;
        sendMessageToQueue(message);
        res.send({ status: true, message: 'message delivered' });

    } catch (error) {
        console.log('error in sendMessage ', error);
        res.send({
            status: false,
            error
        });
    }
};

module.exports = { sendMessage };