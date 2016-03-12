const http = require('http')
const SocketIo = require('socket.io')
const Rx = require('rxjs')
const logFactory = require('../components/log')
const userFactory = require('../components/user')
const logConsumerConsoleFactory = require('../components/log-consumer-console')
const socketConnectionFactory = require('./socket-connection')
const configFactory = require('../config')
const eventsFactory = require('./interactions/events')

function closeFactory(server, log) {
  return function close () {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        log.actions.add({
          level: log.levels.info,
          group: log.groups.httpServer,
          message: 'Server closed'
        })
        resolveClose()
      })
    })
  }
}

function httpServerListen(serverData, log) {
  return new Promise(function handleCreatePromise(resolve) {
    serverData.httpServer.listen(
      serverData.port,
      serverData.host,
      function handleServerListen() {
        log.actions.add({
          level: log.levels.info,
          group: log.groups.httpServer,
          message: 'Listening on ' +
          `[${serverData.httpServer.address().address}:` +
          `${serverData.httpServer.address().port}]`
        })
        resolve()
      }
    )
  })
}

function createSetupIoServerFn(httpServer, interactions, log) {
  return function handleThenSetupIoServer() {
    const ioServer = SocketIo.listen(httpServer)
    ioServer.on(
      'connection',
      socketConnectionFactory.create(interactions, log)
    )
  }
}

// TODO: Fix too many statements eslint error. -MANI
/* eslint-disable max-statements */
function create() {
  const log = logFactory.create()
  const config = configFactory.create()
  const httpServer = http.createServer()
  const user = userFactory.create()
  // TODO: Compose more components' actions. -MANI
  const actions = {
    user: user.actions
  }
  // TODO: Compose more components' events. MANI
  const events = eventsFactory.create(Rx, [user.events.event$])
  logConsumerConsoleFactory.create(log, config.LOG_LEVELS, config.LOG_GROUPS)
  log.actions.add({
    level: log.levels.info,
    group: log.groups.httpServer,
    message: `Server starting with NODE_ENV: [${process.env.NODE_ENV}]`
  })
  // TODO: Obfuscate values before logging. -MANI
  const JSON_SPACING = 2
  log.actions.add({
    level: log.levels.info,
    group: log.groups.httpServer,
    message: `Config loaded with keys: \n` +
    `CONFIG START\n` +
    `${JSON.stringify(Object.keys(config), null, JSON_SPACING)}` +
    `\nCONFIG END`
  })
  events.event$.subscribe(function logEvent(eventData) {
    log.actions.add({
      level: log.levels.info,
      group: log.groups.event,
      message: JSON.stringify(eventData, null, JSON_SPACING)
    })
  })
  return httpServerListen(
    {
      httpServer,
      port: config.PORT,
      host: config.HOST
    },
    log
  )
  .then(
    createSetupIoServerFn(
      httpServer,
      {
        events,
        actions
      },
       log
    )
  )
  .then(function handleThenReturnServerData() {
    return {
      httpServer,
      close: closeFactory(httpServer, log),
      config
    }
  })
}
/* eslint-enable max-statements */

module.exports = {
  create
}
