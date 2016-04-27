'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ava2.default.cb('log', function handleTests(test) {
  var log = _index2.default.create();
  var addSubscriber = log.events.error$.subscribe(function handleSubscribe(data) {
    addSubscriber.unsubscribe();
    test.deepEqual(data, {
      group: 'event',
      message: 'test'
    });
    test.end();
  });
  log.actions.error({
    group: log.groups.event,
    message: 'test'
  });
});