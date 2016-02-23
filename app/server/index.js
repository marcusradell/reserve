const http = require('http')
const Rx = require('rx')
const SocketIo = require('socket.io')

function getCloseFn(server) {
  return function close () {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        /* eslint-disable no-console */
        console.log(
          `Server closed on [${process.env.HOST}:${process.env.PORT}]`
        )
        /* eslint-enable no-console */
        resolveClose()
      })
    })
  }
}

function create() {
  // const request$ = new Rx.Subject()
  // router.init('/v1', request$)

  return new Promise(function handleCreatePromise(resolveCreate) {
    const httpServer = http.createServer()
    const ioServer = SocketIo.listen(httpServer)
    const second = 1000

    const event$ = Rx.Observable
    .interval(second)
    .timeInterval()
    .map(function handleMap(value) {
      return JSON.stringify(value)
    })

    ioServer.on('connection', function handleConnect(socket) {
      /* eslint-disable no-console */
      console.log(
        'Server recieved a connect.'
      )
      /* eslint-enable no-console */

      event$.subscribe(function handleSubscribe(val) {
        socket.emit('message', val)
      })

      socket.on('disconnect', function handleDisconnect() {
        /* eslint-disable no-console */
        console.log(
          'Server recieved a disconnect.'
        )
        /* eslint-enable no-console */
      })
    })

    httpServer.listen(
      process.env.PORT,
      process.env.HOST,
      function handleServerListen() {
        /* eslint-disable no-console */
        console.log(
          `Server started on [${process.env.HOST}:${process.env.PORT}]`
        )
        /* eslint-enable no-console */

        resolveCreate({
          httpServer,
          close: getCloseFn(httpServer)
        })
      })
  })
}

module.exports = {
  create
}
