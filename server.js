const http = require('http')
const Rx = require('rx')
const Promise = require('bluebird')
const request$ = new Rx.Subject()
const responseCodes = {
  'success': 200
}

function sendHello(data) {
  data.res.writeHead(responseCodes.success, {'Content-Type': 'text/plain'})
  data.res.end('Hello World!')
}

request$.subscribe(sendHello)

function create() {
  return new Promise(function handleCreatePromise(resolveCreate) {
    const server = http.createServer(function handleConnect(req, res) {
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

        function close() {
          return new Promise(function handleDestroyPromise(resolveClose) {
            server.close(function handleClose() {
              resolveClose()
            })
          })
        }

        resolveCreate({
          server,
          close
        })
      })
  })
}
module.exports = {
  create
}
