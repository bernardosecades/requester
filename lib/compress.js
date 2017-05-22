const zlib = require('zlib');

module.exports = {

  /**
   * @param {String} dataWithoutCompress
   * @returns {*}
   */
  compress(dataWithoutCompress) {
    return zlib.deflateSync(dataWithoutCompress);
  },

  /**
   * @param {String} dataCompressed
   * @returns {*}
   */
  uncompress(dataCompressed) {
    return zlib.unzipSync(dataCompressed);
  },
};
