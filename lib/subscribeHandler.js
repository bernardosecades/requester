const statsLogger = require('./stats-logger');
const timer = require('./timer');
const config = require('../config/config');
const compress = require('./compress');
const errorResponseHandler = require('./error/errorResponseHandler');
const MessageIn = require('./message-in');
const debug = require('./debug');
const sender = require('./sender');

module.exports = {

  /**
   * @param {*} amqpMessage
   * @param {Exchange} exchange
   */
  handle(amqpMessage, exchange) {
    const messageIn = new MessageIn(amqpMessage);
    const t1 = timer.now();
    sender(messageIn)
      .then((response) => {
        const totalTimeT1 = timer.diff(t1);
        const statsKey = 'time.response');
        statsLogger.timing(statsKey, totalTimeT1);

        const messageOut = JSON.stringify({
          response,
          context: messageIn.getContextInfo(),
        });

        if (debug) {
          debug('Publish response from url:', messageIn.getUrl());
          debug('key stats:', statsKey, totalTimeT1);
        }

        exchange.publish(
          config.exchange.routingKeyOut,
          compress.compress(messageOut),
          config.publisher.options);
      }).catch((error) => {
        errorResponseHandler.handle(error, messageIn.getUrl(), 'providerName', 'branchOffice');

        const response = {
          body: error,
          statusCode: 500
        };

        const messageOut = JSON.stringify({
            response,
            context: messageIn.getContextInfo(),
        });

        exchange.publish(
            config.exchange.routingKeyOut,
            compress.compress(messageOut),
            config.publisher.options);
      });
  },
};
