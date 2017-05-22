const amqp = require('amqp');
const config = require('../config/config');
const subscribeHandler = require('./subscribeHandler');
const errorConnectionHandler = require('./error/errorConnectionHandler');
const closedConnectionHandler = require('./error/closedConnectionHandler');

module.exports = {
  run() {
    const connection = amqp.createConnection(config.rabbitConnection);
    const connectionReadyHandler = () => {
      const exchange = connection.exchange(config.exchange.name, config.exchange.options);
      const queue = connection.queue(config.originQueue.name, config.originQueue.options);
      queue.bind(exchange, config.exchange.routingKeyIn);
      queue.subscribe((amqpMessage) => {
        subscribeHandler.handle(amqpMessage, exchange);
      });
    };

    connection.on('ready', connectionReadyHandler);
    connection.on('error', errorConnectionHandler);
    connection.on('close', closedConnectionHandler);
  },
};
