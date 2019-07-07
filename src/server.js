'use strict';

const path = require('path');
const debug = require('debug');
const express = require('express');

const Logger = require('./Logger');

const logger = new Logger(debug('app'));
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.log('start', { port }));

process.on('SIGTERM', () => {
  logger.log('shutdown', {});
  server.close();
});
