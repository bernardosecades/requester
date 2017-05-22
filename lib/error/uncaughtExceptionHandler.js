const statsLogger = require('../stats-logger');

/**
 * @param {*} error
 */
module.exports = (error) => {
  console.log('Caught exception: ', error);
  statsLogger.increment('uncaughtException');
};
