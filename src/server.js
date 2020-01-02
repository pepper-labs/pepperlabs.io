'use strict';

const http = require('http');
const path = require('path');

const debug = require('debug');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const Logger = require('./Logger');
const RequestAuthorizer = require('./RequestAuthorizer');
const config = require('./config');

const requestAuthorizer = new RequestAuthorizer(
  config.authorization.tokens,
  config.staticPath,
  new Logger(debug('app:authorization'))
);
const logger = new Logger(debug('app'));
const app = express();

if (config.isProxied) {
  app.enable('trust proxy');
}

app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  if (true || requestAuthorizer.isAuthorized(req)) {
    return next();
  }
  res.send()
});
app.use(express.static(path.join(__dirname, '../dist')));

const server = app.listen(config.port, () => logger.log('start', { port: config.port }));

process.on('SIGTERM', () => {
  logger.log('shutdown', {});
  server.close();
});

setInterval(() => http.get('https://pepperlabs.io'), 29 * 60 * 1000);
