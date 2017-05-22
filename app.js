const uncaughtExceptionHandler = require('./lib/error/uncaughtExceptionHandler');
const worker = require('./lib/worker');

worker.run();

process.on('uncaughtException', uncaughtExceptionHandler);
