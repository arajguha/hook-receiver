const log4js = require("log4js");
const loggerConfig = require('../../config/loggerConfig.json');
const { env } = require('../../config/vars');

if (env === 'development') {
    loggerConfig.categories.default.appenders.push('console');
}
log4js.configure(loggerConfig);

const logger = log4js.getLogger();
logger.level = env === 'development' ? 'debug' : 'production';

class CustomLogger {
    constructor() {
        this.prefix = `[ worker ${process.pid}]`;
        this.logger = logger;
    }

    info (logData) {
        this.logger.info(`${this.prefix} ${logData}`);
    }

    debug (logData) {
        this.logger.debug(`${this.prefix} ${logData}`);
    }

    error (err) {
        this.logger.error(`${this.prefix} ${err.message || JSON.stringify(err)}`);
    }
}

module.exports = new CustomLogger();