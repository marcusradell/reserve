require('../config')
const rootTest = require('tap').test
const serverCreate = require('../server')
const ioClient = require('socket.io-client')
const socketURL = `http://${process.env.HOST}:${process.env.PORT}`
const serverOptions = {
  logLevels: 'none',
  logGroups: 'none',
  port: process.env.PORT,
  host: process.env.HOST
}
const ioOptions = {
  transports: ['websocket'],
  'force new connection': true
}

rootTest('server', function handleTape(test) {
  return new Promise(function handlePromise(resolve, reject) {
    serverCreate.create(serverOptions)
    .then(function handleCreateThen(serverData) {
      const socket = ioClient(socketURL, ioOptions)

      socket.on('connect', function handleConnect() {
        socket.disconnect()
        test.pass('should connect a client.')
      })

      socket.on('error', function handleData(err) {
        reject(err)
        serverData.close()
      })

      socket.on('disconnect', function handleClose() {
        test.pass('should disconnect a client.')
        serverData.close()
        resolve()
      })
    })
  })
})
