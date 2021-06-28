const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const serverConfigs = require('./server');
const _ = require('lodash');

const env = process.env.NODE_ENV || 'development'
const appEnv = process.env.APP_ENV || env

const getConfigs = () => {
    const baseConfig = {
        env,
        config_env: appEnv,
        distPath: path.resolve(__dirname, '..', 'public'),
        serviceRootPath: path.resolve(__dirname, '..', 'service'),
        port: process.env.APP_PORT || 3001
    };
    const serverConfig = serverConfigs[appEnv];
    const serviceYaml = yaml.load(
        fs.readFileSync(
            path.resolve(baseConfig.serviceRootPath, 'config', 'service.yaml'), 'utf8'
        )
    );

    return _.merge(baseConfig, serviceYaml, serverConfig);
};

module.exports = getConfigs();
