const http = require('http')
const SocketIo = require('socket.io')
const log = require('../components/log')
const user = require('../components/user')
const logProducerConsole = require('../components/log-producer-console')
const handleConnectFactory = require('./handle-connect-factory')
const createEvent$Factory = require('./create-event$-factory')
const createEvent$ = createEvent$Factory.create(user)

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

function httpServerListen(httpServer, port, host) {
  return new Promise(function handleCreatePromise(resolve) {
    httpServer.listen(
      port,
      host,
      function handleServerListen() {
        log.events.add(
          log.levels.info,
          log.groups.httpServer,
          `Listening on [${process.env.HOST}:${process.env.PORT}]`
        )
        resolve()
      }
    )
  })
}

function handleThenSetupIoServerFactory(httpServer, event$, logModule) {
  return function handleThenSetupIoServer() {
    const ioServer = SocketIo.listen(httpServer)
    ioServer.on('connection', handleConnectFactory.create(event$, logModule))
  }
}

function create(options) {
  logProducerConsole.create(log, options.logLevels, options.logGroups)
  const httpServer = http.createServer()
  return httpServerListen(httpServer, options.port, options.host)
  .then(
    handleThenSetupIoServerFactory(
      httpServer,
      createEvent$(),
       log
    )
  )
  .then(function handleThenReturnServerData() {
    return {
      httpServer,
      close: closeFactory(httpServer)
    }
  })
}

module.exports = {
  create
}
