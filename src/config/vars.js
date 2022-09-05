require('dotenv-safe').config();

module.exports = {
    port: process.env.PORT || 8081,
    messageQueue: {
        connection: null,
        channel: null
    },
    queueName: process.env.QUEUE_NAME || 'webhook_tasks'
}