const env = process.env
const host = env.APP_HOST || 'http://localhost'
const port = env.APP_PORT
const hostUrl =  + `${host}:${port}`

module.exports = {
  development: {
    host,
    port,
    hostUrl,
    "db": {
      "migrDir": "development",
      "enableLogger": 0,
      "connection": {
        "dialect": "mysql",
        "host": env.DB_HOST,
        "port": env.DB_PORT,
        "username": env.DB_USER,
        "password": env.DB_PASS,
        "database": env.DB_NAME,
      }
    },
    "auth": {
      "secretJWT": env.JWT_SECRET,
      "secretPWD": env.JWT_PASS,
      "expiresIn": "48h",
      "multiSessionInactiveIn": {
        "minutes": 30
      }
    },
    "auth_refresh": {
      "secretJWT": env.JWT_REFRESH,
      "expiresIn": "7d"
    },
    "logging": {
      "logsFolder": "./logs",
      "errorLogsFolder": "./error_logs"
    },
    "corsWhiteList": []
  }
}
