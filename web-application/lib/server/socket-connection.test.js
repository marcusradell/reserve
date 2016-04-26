'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// TODO: Remake with ES6. -MANI
var tests = require('ava');
var Rx = require('rxjs');
var handleConnectFactory = require('./socket-connection');
var logFactory = require('reserve-common/lib/components/log').default;

tests.cb('handle-connect', function handleRootTest(unitTests) {
  var mockedEvent$ = new Rx.Subject();
  function mockedAction(data) {
    mockedEvent$.next(data);
  }
  var mockedInteractions = {
    events: { event$: mockedEvent$ },
    actions: { mockedAction: mockedAction }
  };
  unitTests.cb('create', function handleUnitTest(unitTest) {
    var log = logFactory.create();
    var handleConnect = handleConnectFactory.create(mockedInteractions, log);
    unitTest.strictEquals(typeof handleConnect === 'undefined' ? 'undefined' : _typeof(handleConnect), 'function', 'should return a function');
    unitTest.end();
  });

  unitTests.end();
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