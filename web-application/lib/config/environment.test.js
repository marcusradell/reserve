'use strict';

var tests = require('ava');
var environmentConfigFactory = require('./environment');

tests.cb('config environment', function handleRootTest(test) {
  var environmentConfigWithPrefix = environmentConfigFactory.create({ PREFIX_VARNAME: 'value' }, 'PREFIX_');
  test.deepEquals(environmentConfigWithPrefix, { VARNAME: 'value' }, 'should create a config object without prefixes');
  var environmentConfigWithoutPrefix = environmentConfigFactory.create({ VARNAME: 'value' }, 'PREFIX_');
  test.deepEquals(environmentConfigWithoutPrefix, {}, 'should create a config object without prefixes');
  test.end();
});