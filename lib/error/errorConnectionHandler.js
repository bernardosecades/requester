const statsLogger = require('../stats-logger');

/**
 * @param {*} error
 */
module.exports = (error) => {
  console.error('Error connection: ', error);
  statsLogger.increment('connection.error');
};
