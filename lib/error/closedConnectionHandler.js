const statsLogger = require('../stats-logger');

/**
 * @param {*} error
 */
module.exports = (error) => {
  console.error('connection closed:', error);
  statsLogger.increment('connection.closed');
};
