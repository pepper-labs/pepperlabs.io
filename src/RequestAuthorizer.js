'use strict';

module.exports = class RequestAuthorizer {
  constructor(accessTokens, staticPath, logger) {
    this._accessTokens = accessTokens;
    this._logger = logger;
    this._staticPath = staticPath;
  }

  isAuthorized(request) {
    if (this._isAllowedPath(request.path)) {
      return true;
    }

    const isAuthorized = this._accessTokens.includes(request.query.accessToken);
    if (!isAuthorized) {
      this._logger.log('unauthorized', { ip: request.ip, path: request.path });
      return false;
    }

    return true;
  }

  _isAllowedPath(path) {
    if (path.startsWith(this._staticPath)) {
      return true;
    }

    const isBasePath = path === '' || path === '/';
    return !path.endsWith('.html') && !isBasePath;
  }
};
