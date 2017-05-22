const config = require('../config/config');
const Lynx = require('lynx');

const metrics = new Lynx(config.statsdConnection.host, config.statsdConnection.port);
const prefix = 'requester_'.concat(process.env.NODE_ENV, '.');

module.exports = {

  /**
   * @param {String} key
   */
  increment(key) {
    metrics.increment(this.getFullKey(key));
  },

  /**
   * @param {String} key
   */
  decrement(key) {
    metrics.decrement(this.getFullKey(key));
  },

  /**
   * @param {String} key
   * @param {Number} time
   */
  timing(key, time) {
    metrics.timing(this.getFullKey(key), time);
  },

  /**
   * @param {String} key
   * @param {Number} value
   * @param {Number} sampleRate
   */
  gauge(key, value, sampleRate) {
    metrics.gauge(this.getFullKey(key), value, sampleRate);
  },

  /**
   * @param {String} key
   * @param {Number} value
   * @param {Number} sampleRate
   */
  set(key, value, sampleRate) {
    metrics.gauge(this.getFullKey(key), value, sampleRate);
  },

  /**
   * @param {String} key
   * @returns {string}
   */
  getFullKey(key) {
    return prefix.concat(key);
  },
};
