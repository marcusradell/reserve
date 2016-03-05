require('./config')
const serverCreate = require('./server')

serverCreate.create({
  logLevels: process.env.LOG_LEVELS,
  logGroups: process.env.LOG_GROUPS,
  port: process.env.PORT,
  host: process.env.HOST
})
