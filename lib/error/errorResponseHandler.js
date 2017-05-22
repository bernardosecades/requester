const statsLogger = require('../stats-logger');

module.exports = {

  /**
   * @param {*}      error
   * @param {String} url
   * @param {String} providerName
   * @param {String} branchOffice
   */
  handle(error, url, providerName, branchOffice) {
    console.error('Can not get response from url: ', url, error);
    statsLogger.increment('response.error.'.concat(providerName, '.', branchOffice));
  },
};
