const http = require('http')
const Rx = require('rx')
const request$ = new Rx.Subject()
const responseCodes = require('../constants/response-codes')
const responseHeaders = require('../constants/response-headers')

function sendHello(data) {
  const headers = {}
  headers[responseHeaders.contentType] = responseHeaders.applicationJson
  data.res.writeHead(responseCodes.success, headers)
  data.res.end(JSON.stringify({'text': 'Hello World!'}))
}

request$.filter(function rootPathFilter(requestData) {
  return requestData.req.url === '/'
}).subscribe(sendHello)

request$.filter(function rootPathFilter(requestData) {
  return requestData.req.url === '/'
}).subscribe(sendHello)

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
