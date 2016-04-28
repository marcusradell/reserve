'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logConsumer = require('reserve-common/lib/components/log-consumer');

var _logConsumer2 = _interopRequireDefault(_logConsumer);

var _log = require('reserve-common/lib/components/log');

var _log2 = _interopRequireDefault(_log);

var _sentryWriters = require('reserve-common/lib/components/log-consumer/writers/sentry-writers');

var _sentryWriters2 = _interopRequireDefault(_sentryWriters);

var _stdWriters = require('reserve-common/lib/components/log-consumer/writers/std-writers');

var _stdWriters2 = _interopRequireDefault(_stdWriters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespace = 'serverLog';

function create(config) {
  var log = _log2.default.create(namespace);
  _logConsumer2.default.create(log, _stdWriters2.default.create(), {
    groupsFilter: config.LOG_GROUPS
  });
  if (config.SENTRY) {
    _logConsumer2.default.create(log, _sentryWriters2.default.create(config.SENTRY), {
      groupsFilter: null
    });
  }
  return log;
}

exports.default = {
  create: create
};