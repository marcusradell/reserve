import Rx from 'rxjs'
import handleConnectFactory from './socket-connection'
import logFactory from 'reserve-common/lib/components/log'
import tests from 'ava'

tests.cb('handle-connect', function handleRootTest(test) {
  const mockedEvent$ = new Rx.Subject()
  function mockedAction(data) {
    mockedEvent$.next(data)
  }
  const mockedInteractions = {
    events: {event$: mockedEvent$},
    actions: {mockedAction}
  }
  // unitTests('create', function handleUnitTest(unitTest) {
  const log = logFactory.create()
  const handleConnect = handleConnectFactory.create(mockedInteractions, log)
  test.is(
    typeof handleConnect,
    'function',
    'should return a function'
  )
  test.end()
  // })
  // TODO: mockedSocket.on is called with 'message' and 'disconnect.'
  // Fix tests. -MANI
  // unitTests.test('handleConnect', function handleUnitTest(unitTest) {
  //   const log = logFactory.create()
  //   const PLANNED_UNIT_TESTS = 4
  //   unitTest.plan(PLANNED_UNIT_TESTS)
  //   const handleConnect = handleConnectFactory.create(
  //     mockedInteractions, log
  //   )
  //   const mockedSocket = {}
  //   mockedSocket.on = function on(namespace, callback) {
  //     unitTest.strictEquals(
  //       namespace,
  //       'disconnect',
  //       'should subscribe to socket namespace "disconnect"'
  //     )
  //     unitTest.strictEquals(
  //       typeof callback,
  //       'function',
  //       'should have a callback of type "function"'
  //     )
  //   }
  //   mockedSocket.emit = function emit(namespace, value) {
  //     unitTest.strictEquals(
  //       namespace,
  //       'event$',
  //       'should emit from socket with namespace "event$"'
  //     )
  //     unitTest.strictEquals(
  //       value,
  //       'hello',
  //       'should have a value of "hello"'
  //     )
  //   }
  //   handleConnect(mockedSocket)
  //   mockedEvent$.next('hello')
  // })
})
