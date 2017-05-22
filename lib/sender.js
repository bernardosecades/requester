const request = require('request');

/**
 * @param {Message} message
 * @returns {Promise}
 */
module.exports = function (message) {
  return new Promise(
    (resolve, reject) => {
      const options = {
        url: message.getUrl(),
        method: message.getMethod(),
        headers: message.getHeaders(),
        body: message.getBody(),
        gzip: message.expectGzip(),
        timeout: 30000,
      };

      request(options,
        (error, response) => {
          if (error) {
            reject(error);
          } else if (response.statusCode !== 200) {
              reject(response.body)
          } else {
              resolve(response);
          }
        });
    });
};
