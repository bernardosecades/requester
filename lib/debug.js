const DEBUG = process.env.NODE_DEBUG_REQUESTER;

let debug = null;

if (DEBUG) {
  /**
   * @param {Array} args
   */
  debug = (...args) => {
    console.info(...args);
  };
}

module.exports = debug;
