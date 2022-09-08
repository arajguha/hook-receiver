const http = require('http');
const app = require('./config/express');
const { port } = require('./config/vars');
const rabbitMq = require('./config/rabbitmq');
const logger = require('./api/utils/logger');

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(-1);
});

rabbitMq
    .connect()
    .then(() => {
        http.createServer(app).listen(port, () => logger.info(`server started in port ${port}`));
    })
    .catch(err => {
        logger.error('error in startup ', error);
        process.exit(-1);
    });
