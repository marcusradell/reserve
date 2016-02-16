const http = require('http')
const Rx = require('rx')
const router = require('./router')

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
  const request$ = new Rx.Subject()
  router.init('/v1', request$)

  return new Promise(function handleCreatePromise(resolveCreate) {
    const server = http.createServer()

    server.on('request', function handleConnect(req, res) {
      request$.onNext({req, res})
    })

    server.listen(
      process.env.PORT,
      process.env.HOST,
      function handleServerListen() {
        /* eslint-disable no-console */
        console.log(
          `Server started on [${process.env.HOST}:${process.env.PORT}]`
        )
        /* eslint-enable no-console */

        resolveCreate({
          server,
          close: getCloseFn(server)
        })
      })
  })
}

module.exports = {
  create
}
