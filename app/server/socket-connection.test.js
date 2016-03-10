const rootTest = require('tap')
const Rx = require('rxjs')
const handleConnectFactory = require('./socket-connection')
const log = require('../components/log')

rootTest.test('handle-connect', function handleRootTest(unitTests) {
  const mockedEvent$ = new Rx.Subject()

  unitTests.test('create', function handleUnitTest(unitTest) {
    const handleConnect = handleConnectFactory.create(mockedEvent$, log)
    unitTest.strictEquals(
      typeof handleConnect,
      'function',
      'should return a function'
    )
    unitTest.done()
  })

  unitTests.test('handleConnect', function handleUnitTest(unitTest) {
    const PLANNED_UNIT_TESTS = 4
    unitTest.plan(PLANNED_UNIT_TESTS)
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
    }
    handleConnect(mockedSocket)
    mockedEvent$.next('hello')
  })
  unitTests.done()
})
