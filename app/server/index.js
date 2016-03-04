const http = require('http')
const SocketIo = require('socket.io')
const log = require('../components/log')
const consoleLogger = require('../components/console-logger')

const events = require('./create-event$')
const handleConnectFactory = require('./handle-connect-factory')

function closeFactory(server) {
  return function close () {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        log.events.add(
          log.levels.info,
          log.groups.httpServer,
          `Server closed on [${process.env.HOST}:${process.env.PORT}]`
        )
        resolveClose()
      })
    })
  }
}

function httpServerListen(httpServer, resolveCreate) {
  httpServer.listen(
    process.env.PORT,
    process.env.HOST,
    function handleServerListen() {
      log.events.add(
        log.levels.info,
        log.groups.httpServer,
        `Listening on [${process.env.HOST}:${process.env.PORT}]`
      )
      resolveCreate({
        httpServer,
        close: closeFactory(httpServer)
      })
    })
}

function create() {
  return new Promise(function handleCreatePromise(resolveCreate) {
    consoleLogger.create(
      log,
      process.env.LOG_LEVELS,
      process.env.LOG_GROUPS
    )
    const httpServer = http.createServer()
    const ioServer = SocketIo.listen(httpServer)
    const event$ = events.createEvent$()
    ioServer.on('connection', handleConnectFactory.create(event$, log))
    httpServerListen(httpServer, resolveCreate)
  })
}

module.exports = {
  create
}
