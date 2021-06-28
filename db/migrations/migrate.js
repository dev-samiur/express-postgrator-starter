const path = require('path');
const Postgrator = require('postgrator');
const config = require('../../config');
const logger = require('../../utils/logger');

const connection = config.db.connection
const driver = connection.dialect

module.exports = () => {
    logger.debug('DB Migrate');
    logger.debug('NODE_ENV: %s', config.env);
    logger.debug('CONFIG_ENV: %s', config.config_env);
    logger.debug('DB_CONFIG: %j', config.db);

    logger.info('Migration started');
    const postgrator = new Postgrator({
        ...connection,
        driver,
        migrationDirectory: path.resolve(__dirname, config.db.migrDir || 'development'),
    });

    return postgrator
        .on('migration-finished', ({filename}) => logger.info('%s', filename))
        .migrate()
        .then(() => {
            logger.info('Migration complete');
        })
        .catch((err) => {
            logger.error('Migration error:\n%o', err);
        });
};
