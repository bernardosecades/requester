const statsLogger = require('../stats-logger');

/**
 * @param {Boolean} errorHasOccured
 * @param {*} publishError
 */
module.exports = (errorHasOccured, publishError) => {
  if (errorHasOccured) {
    console.error('Error to publish message', publishError);
    statsLogger.increment('publish.error');
  }
};
