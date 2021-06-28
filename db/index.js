const Sequelize = require('sequelize');
const config = require('../config');
const logger = require('../utils/logger');

const connection = config.db.connection

const db = new Sequelize({...connection, logging: !!config.db.enableLogger && ((msg) => logger.db(msg))});

module.exports = db;
