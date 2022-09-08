const Joi = require('joi');
const httpStatus = require('http-status');
const logger = require('./logger');

const sendMessageValidationSchema = Joi.object({
    message: Joi.any()
});

const validateSendMessage = (req, res, next) => {
    const { error } = sendMessageValidationSchema.validate(req.body);
    if (error) {
        logger.error('inside validateSendMessage ', error);
        return res.status(httpStatus.BAD_REQUEST).send({
            status: false,
            error
        });
    }
    return next();
};

module.exports = { validateSendMessage };