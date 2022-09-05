const Joi = require('joi');
const httpStatus = require('http-status');

const sendMessageValidationSchema = Joi.object({
    message: Joi.any()
});

const validateSendMessage = (req, res, next) => {
    console.log('inside validateSendMessage');
    const { error } = sendMessageValidationSchema.validate(req.body);
    if (error) {
        console.log('inside validateSendMessage ', error);
        return res.status(httpStatus.BAD_REQUEST).send({
            status: false,
            error
        });
    }
    return next();
};

module.exports = { validateSendMessage };