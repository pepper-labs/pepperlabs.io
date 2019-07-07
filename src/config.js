'use strict';

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  authorization: {
    tokens: JSON.parse(process.env.ACCESS_TOKENS || '[]')
  },
  staticPath: '/static',
  isProxied: String(process.env.IS_PROXIED || '').toLowerCase() === 'true'
};
