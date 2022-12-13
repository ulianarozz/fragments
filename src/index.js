// src/index.js

// Read environment variables from an .env file (if present)
require('dotenv').config();

// We want to log any crash cases so we can debug later from logs.
const logger = require('./logger');

//Breaking CI Build
//const unneededVariable = 'This variable is never used';

// If we're going to crash because of an uncaught exception, log it first.
// https://nodejs.org/api/process.html#event-uncaughtexception
// eslint-disable-next-line no-undef
process.on('uncaughtException', (err, origin) => {
  logger.fatal({ err, origin }, 'uncaughtException');
  throw err;
});

// If we're going to crash because of an unhandled promise rejection, log it first.
// https://nodejs.org/api/process.html#event-unhandledrejection
// eslint-disable-next-line no-undef
process.on('unhandledRejection', (reason, promise) => {
  logger.fatal({ reason, promise }, 'unhandledRejection');
  throw reason;
});

// Start our server
require('./server');
