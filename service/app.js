const express = require('express');

const logger = require('../utils/logger');

const app = express();

const postgrator= require('../db/migrations/migrate');
postgrator();

// @todo implementation

// postgrator
//   .migrate()
//   .then((appliedMigrations) => console.log(appliedMigrations))
//   .catch((error) => console.log(error))

module.exports = app;
