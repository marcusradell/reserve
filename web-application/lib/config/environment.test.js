'use strict';

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('config environment', function handleRootTest(test) {
  var environmentConfigWithPrefix = _environment2.default.create({ PREFIX_VARNAME: 'value' }, 'PREFIX_');
  test.deepEqual(environmentConfigWithPrefix, { VARNAME: 'value' }, 'should create a config object without prefixes');
  var environmentConfigWithoutPrefix = _environment2.default.create({ VARNAME: 'value' }, 'PREFIX_');
  test.deepEqual(environmentConfigWithoutPrefix, {}, 'should create a config object without prefixes');
});