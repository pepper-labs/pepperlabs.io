'use strict';

const path = require('path');
const debug = require('debug');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const Logger = require('./Logger');
const config = require('./config');

const logger = new Logger(debug('app'));
const app = express();

if (config.isProxied) {
  app.enable('trust proxy');
}

app.use(cors());
app.use(helmet());

const server = app.listen(config.port, () => logger.log('start', { port: config.port }));

process.on('SIGTERM', () => {
  logger.log('shutdown', {});
  server.close();
});
