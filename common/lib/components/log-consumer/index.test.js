'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

var _mockWriters = require('./writers/mock-writers');

var _mockWriters2 = _interopRequireDefault(_mockWriters);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ava2.default.cb('log-consumer', function onTests(test) {
  var log = _log2.default.create();
  // NOTE: Proxy is populated with the subscription later in the code. -MANI
  var subscriptionProxy = {};
  var writeStreamsMock = _mockWriters2.default.create(function handleWrite(message) {
    test.deepEqual(message, {
      group: 'event',
      message: 'test'
    });
    subscriptionProxy.subscription.unsubscribe();
    test.end();
  });
  subscriptionProxy.subscription = _index2.default.create(log, writeStreamsMock, {}).subscription;
  log.actions.error({
    group: log.groups.event,
    message: 'test'
  });
});