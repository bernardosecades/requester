class MessageIn {

  /**
   * Create a request info
   * @param message
   */
  constructor(message) {
    this.isCompressed = false;
    const data = JSON.parse(message.data.toString('utf8'));
    this.url = data.url;

    if (this.url.includes('gzipResponse=true')) {
      this.isCompressed = true;
    }

    this.body = data.body;
    this.headers = this.headersArrayToJson(data.header);
    this.method = data.mode;
    this.contextInfo = data.context_info;
    this.providerId = data.provider_id;
    this.branchOffice = data.branch_office;
  }

  headersArrayToJson(headersArray) {
    const headers = {};
    for (const idx in headersArray) {
        const res = headersArray[idx].split(/:(.+)/);
        const value = res[1];

        if (value === '') {
          value = undefined;
        }

        if (res[0].toUpperCase() === 'ACCEPT-ENCODING') {
            headers[res[0]] = value;
            this.isCompressed = true;
        } else if (res[0] === 'Expect:') {
            headers['Expect'] = undefined;
        } else if (res[0].toUpperCase() === 'CONTENT-LENGTH') {
            headers[res[0]] = Buffer.byteLength(this.body);
        } else if (value !== undefined){
            headers[res[0].trim()] = value.trim();
        }
    }
    return headers;
  }

  /**
   * @returns {string}
   */
  getUrl() {
    return this.url;
  }
  /**
   * @returns {Array}
   */
  getHeaders() {
    return this.headers;
  }
  /**
   * @returns {String}
   */
  getBody() {
    return this.body;
  }

  /**
   * @returns {String}
   */
  getMethod() {
    return this.method;
  }

  /**
   * @returns {Array}
   */
  getContextInfo() {
    return this.contextInfo;
  }

  /**
   * @returns {boolean}
   */
  expectGzip() {
    return this.isCompressed;
  }
}

module.exports = MessageIn;
