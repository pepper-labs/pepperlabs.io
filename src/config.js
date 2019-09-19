'use strict';

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  staticPath: '/static',
  isProxied: String(process.env.IS_PROXIED || '').toLowerCase() === 'true'
};
