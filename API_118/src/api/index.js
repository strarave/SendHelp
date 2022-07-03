const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const config = require('../lib/config');
const logger = require('../lib/logger');

const log = logger(config.logger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/*
 * Routes
 */
app.use('/serviceStatus', require('./routes/serviceStatus'));
app.use('/ambulances', require('./routes/ambulances'));
app.use('/ambulanceRequest', require('./routes/ambulanceRequest'));

// catch 404
app.use((req, res, next) => {
  log.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});

module.exports = app;
