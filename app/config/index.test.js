require('../config')
const rootTest = require('tap').test

rootTest('config', function onConfigTest(test) {
  const envKeys = Object.keys(process.env)
  test.strictEquals(
    Boolean(process.env.NODE_ENV.length),
    true,
    'should require a value for NODE_ENV'
  )
  test.strictEquals(
    Boolean(process.env.PORT.length),
    true,
    'should require a value for PORT'
  )
  test.strictEquals(
    Boolean(process.env.HOST.length),
    true,
    'should require a value for HOST'
  )
  const INDEX_OF_NOT_FOUND = -1
  test.strictEquals(
    envKeys.indexOf('LOG_MOCKED_DB') !== INDEX_OF_NOT_FOUND,
    true,
    'should have env key LOG_MOCKED_DB'
  )
  test.strictEquals(
    envKeys.indexOf('LOG_LEVELS') !== INDEX_OF_NOT_FOUND,
    true,
    'should have env key LOG_LEVELS'
  )
  test.strictEquals(
    envKeys.indexOf('LOG_GROUPS') !== INDEX_OF_NOT_FOUND,
    true,
    'should have env key LOG_GROUPS'
  )
  test.done()
})
