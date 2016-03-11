const http = require('http')
const SocketIo = require('socket.io')
// TODO: Missing factory pattern.
const logFactory = require('../components/log')
const userFactory = require('../components/user')
const logConsumerConsole = require('../components/log-consumer-console')
const socketConnectionFactory = require('./socket-connection')
const configFactory = require('../config')
const eventsFactory = require('./interactions/events')
const actionsFactory = require('./interactions/actions')

function closeFactory(server, log) {
  return function close () {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        log.events.add(
          log.levels.info,
          log.groups.httpServer,
          'Server closed'
        )
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
        log.events.add(
          log.levels.info,
          log.groups.httpServer,
          'Listening on ' +
          `[${serverData.httpServer.address().address}:` +
          `${serverData.httpServer.address().port}]`
        )
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
      socketConnectionFactory.create(
        interactions.events, interactions.actions, log
      )
    )
  }
}

function create() {
  const log = logFactory.create()
  const config = configFactory.create()
  const httpServer = http.createServer()
  const user = userFactory.create()
  const events = eventsFactory.create([user.events.event$Collection])
  const actions = actionsFactory.create(user.actions)
  logConsumerConsole.create(log, config.LOG_LEVELS, config.LOG_GROUPS)
  log.events.add(
    log.levels.info,
    log.groups.httpServer,
    `Server starting with NODE_ENV: [${process.env.NODE_ENV}]`
  )
  // TODO: Obfuscate values before logging. -MANI
  const JSON_SPACING = 2
  log.events.add(
    log.levels.info,
    log.groups.httpServer,
    `Config loaded with keys: \n` +
    `CONFIG START\n` +
    `${JSON.stringify(Object.keys(config), null, JSON_SPACING)}` +
    `\nCONFIG END`
  )
  events.event$.subscribe(function logEvent(eventData) {
    log.events.add(
      log.levels.info,
      log.groups.event,
      JSON.stringify(eventData, null, JSON_SPACING)
    )
  })
  return httpServerListen({
    httpServer,
    port: config.PORT,
    host: config.HOST
  })
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

module.exports = {
  create
}
