// I use this logger system in my production applications. Essentially, it
// creates a new log file each day and logs JSON messages to those files
// as well as logging them to the console. It provides several useful logging
// interfaces including logger.log(), logger.warn(), and logger.error().
// ============================================================================


// Built-in Node module for safely generating valid URL paths
const path = require('path');

// Winston is an open source logger available on NPM
const winston = require('winston');
// The winston-daily-rotate-file NPM module automatically attaches itself when imported
require('winston-daily-rotate-file');

// Defines where normal logging output (as opposed to errors) is sent
const normalTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../../logs/log'),
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    handleExceptions: true,
    humanReadableUnhandledException: true
});

// Defines where error logging output is sent
const exceptionTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../../logs/exceptions/exceptions'),
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    handleExceptions: true,
    humanReadableUnhandledException: true
});

// Defines the logger object which utilizes the above configuration
const logger = new(winston.Logger)({
    transports: [
        normalTransport,
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        normalTransport,
        new winston.transports.Console(),
        exceptionTransport
    ],
    exitOnError: false
});

// Export the logger for use in other modules.
module.exports = logger;