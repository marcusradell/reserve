'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-statements */
(0, _ava2.default)('config', function onConfigTest(test) {
  /* eslint-enable max-statements */
  var config = _index2.default.create(_index2.default.prefixRsrv);
  var configKeys = Object.keys(config);
  test.is(_index2.default.prefixRsrv, 'RSRV_');
  test.is(Boolean(process.env.NODE_ENV.length), true);
  test.is(Boolean(config.PORT.length), true);
  test.is(Boolean(config.HOST.length), true);
  var INDEX_OF_NOT_FOUND = -1;
  test.is(configKeys.indexOf('LOG_LEVELS') !== INDEX_OF_NOT_FOUND, true, 'should have config variable LOG_LEVELS');
  test.is(configKeys.indexOf('LOG_GROUPS') !== INDEX_OF_NOT_FOUND, true, 'should have config variable LOG_GROUPS');
  test.is(configKeys.indexOf('SENTRY') !== INDEX_OF_NOT_FOUND, true, 'should have config variable SENTRY');
  test.is(configKeys.indexOf('SENDGRID') !== INDEX_OF_NOT_FOUND, true, 'should have config variable SENDGRID');
  test.is(configKeys.indexOf('AUTHY') !== INDEX_OF_NOT_FOUND, true, 'should have config variable AUTHY');
  var EXPECTED_CONFIG_LENGTH = 9;
  test.is(configKeys.length, EXPECTED_CONFIG_LENGTH, 'should have the right number of config variables');
});