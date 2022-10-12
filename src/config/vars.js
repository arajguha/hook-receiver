require('dotenv-safe').config();

module.exports = {
    port: process.env.PORT || 8081,
    messageQueue: {
        connection: null,
        channel: null,
        host: process.env.RABBIT_MQ_HOST || 'localhost',
        port: process.env.RABBIT_MQ_PORT || 5672,
    },
    queueName: process.env.QUEUE_NAME || 'webhook_tasks',
    env: process.env.NODE_ENV || 'production',
    backupService: {
        enabled: process.env.BACKUP_ENABLED && process.env.BACKUP_ENABLED === 'true',
        baseUrl: process.env.BACKUP_SERVICE_BASE_URL || "http://localhost:8083",
    }
}