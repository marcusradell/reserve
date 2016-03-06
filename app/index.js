require('./config')
const serverCreate = require('./server')

serverCreate.create({
  logLevels: process.env.APP_LOG_LEVELS,
  logGroups: process.env.APP_LOG_GROUPS,
  port: process.env.APP_PORT,
  host: process.env.APP_HOST
})
