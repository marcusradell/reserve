require('../config')
const unitTests = require('tap')
const serverFactory = require('../server')
const ioClient = require('socket.io-client')
const ioOptions = {
  transports: ['websocket'],
  'force new connection': true
}

unitTests.test('server', function handleUnitTest(unitTest) {
  serverFactory.create()
  .then(function handleCreateThen(serverData) {
    const config = serverData.config
    const socketURL = `http://${config.HOST}:${config.PORT}`
    const socket = ioClient(socketURL, ioOptions)
    socket.on('connect', function handleConnect() {
      unitTest.pass('should connect a client.')
      socket.disconnect()
    })
    socket.on('error', function handleData(err) {
      serverData.close()
      throw new Error(err)
    })
    socket.on('disconnect', function handleClose() {
      unitTest.pass('should disconnect a client.')
      serverData.close()
      unitTest.done()
    })
  })
})
