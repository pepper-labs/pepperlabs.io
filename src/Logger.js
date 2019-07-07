'use strict';

module.exports = class Logger {
  constructor(logger) {
    this._logger = logger;
  }

  log(event, obj) {
    this._logger('event="%s" %s', event, this._createPayload(obj));
  }

  _createPayload(obj) {
    return Object.entries(obj).map(([key, value]) => `${key}="${value}"`).join(' ');
  }
};
