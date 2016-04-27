'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _socketConnection = require('./socket-connection');

var _socketConnection2 = _interopRequireDefault(_socketConnection);

var _log = require('reserve-common/lib/components/log');

var _log2 = _interopRequireDefault(_log);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ava2.default.cb('handle-connect', function handleRootTest(test) {
  var mockedEvent$ = new _rxjs2.default.Subject();
  function mockedAction(data) {
    mockedEvent$.next(data);
  }
  var mockedInteractions = {
    events: { event$: mockedEvent$ },
    actions: { mockedAction: mockedAction }
  };
  // unitTests('create', function handleUnitTest(unitTest) {
  var log = _log2.default.create();
  var handleConnect = _socketConnection2.default.create(mockedInteractions, log);
  test.is(typeof handleConnect === 'undefined' ? 'undefined' : _typeof(handleConnect), 'function', 'should return a function');
  test.end();
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
});