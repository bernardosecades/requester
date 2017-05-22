module.exports = {

  /**
   * Return arra [seconds, miliseconds]
   *
   * @returns {Array}
   */
  now() {
    return process.hrtime();
  },

  /**
   * Return miliseconds
   *
   * @param {Array} time
   * @returns {number}
   */
  diff(time) {
    return this.convert2ms(process.hrtime(time));
  },

  /**
   * @param {Array} time
   * @returns {number}
   */
  convert2ms(time) {
    const [seconds, nanoseconds] = time;
    return (seconds * 1e3) + (nanoseconds / 1e6);
  },
};
