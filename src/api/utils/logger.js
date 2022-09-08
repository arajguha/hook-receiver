const log4js = require("log4js");
const loggerConfig = require('../../config/loggerConfig.json');
const { env } = require('../../config/vars');

if (env === 'development') {
    loggerConfig.categories.default.appenders.push('console');
}
log4js.configure(loggerConfig);

const logger = log4js.getLogger();
logger.level = env === 'development' ? 'debug' : 'production';

module.exports = logger;