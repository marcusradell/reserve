import http from 'http'

function closeCreate(server, log) {
  return function close () {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        log.actions.info({
          group: log.groups.httpServer,
          message: 'Server closed'
        })
        resolveClose()
      })
    })
  }
}

function create(config, log) {
  const server = http.createServer()
  return new Promise(function handleCreatePromise(resolve) {
    server.listen(
      config.PORT,
      config.HOST,
      function handleServerListen() {
        log.actions.info({
          group: log.groups.httpServer,
          message: 'Listening on ' +
          `[${server.address().address}:` +
          `${server.address().port}]`
        })
        resolve({
          close: closeCreate(server, log),
          server
        })
      }
    )
  })
}

export default {
  create
}
