const rootTest = require('tap').test
const Rx = require('rx')
const handleConnectFactory = require('./handle-connect-factory')
const log = require('../components/log')

rootTest('handleConnectFactory', function handleRootTest(unitTests) {
  const mockedEvent$ = new Rx.Subject()
  return unitTests.test('create', function handleUnitTestCreate(unitTest) {
    return new Promise(function handlePromise(resolve) {
      const handleConnect = handleConnectFactory.create(mockedEvent$, log)
      unitTest.strictEquals(
        typeof handleConnect,
        'function',
        'should return a function'
      )
      resolve()
    })
  })
  .then(function handleThenHandleConnect() {
    return unitTests.test(
      'handleConnect', function handleUnitTesthandleConnect(unitTest) {
        return new Promise(function handlePromise(resolve) {
          const handleConnect = handleConnectFactory.create(
            mockedEvent$, log
          )
          const mockedSocket = {}
          mockedSocket.on = function on(namespace, callback) {
            unitTest.strictEquals(
              namespace,
              'disconnect',
              'should subscribe to socket namespace "disconnect"'
            )
            unitTest.strictEquals(
              typeof callback,
              'function',
              'should have a callback of type "function"'
            )
          }
          mockedSocket.emit = function emit(namespace, value) {
            unitTest.strictEquals(
              namespace,
              'event$',
              'should emit from socket with namespace "event$"'
            )
            unitTest.strictEquals(
              value,
              'hello',
              'should have a value of "hello"'
            )
            resolve()
          }
          handleConnect(mockedSocket)
          mockedEvent$.onNext('hello')
        })
      }
    )
  })
})
