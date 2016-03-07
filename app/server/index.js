const http = require('http')
const SocketIo = require('socket.io')
const log = require('../components/log')
const user = require('../components/user')
const logProducerConsole = require('../components/log-producer-console')
const handleConnectFactory = require('./handle-connect')
const createEvent$Factory = require('./create-event$')
const createEvent$ = createEvent$Factory.create(user)
const configFactory = require('../config')

function closeFactory(server) {
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

function httpServerListen(httpServer, port, host) {
  return new Promise(function handleCreatePromise(resolve) {
    httpServer.listen(
      port,
      host,
      function handleServerListen() {
        log.events.add(
          log.levels.info,
          log.groups.httpServer,
          'Listening on ' +
          `[${httpServer.address().address}:${httpServer.address().port}]`
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

function create() {
  const config = configFactory.create()
  logProducerConsole.create(log, config.LOG_LEVELS, config.LOG_GROUPS)
  const httpServer = http.createServer()
  return httpServerListen(httpServer, config.PORT, config.HOST)
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
      close: closeFactory(httpServer),
      config
    }
  })
}

module.exports = {
  create
}
