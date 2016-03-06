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
    Boolean(process.env.APP_PORT.length),
    true,
    'should require a value for PORT'
  )
  test.strictEquals(
    Boolean(process.env.APP_HOST.length),
    true,
    'should require a value for HOST'
  )
  const INDEX_OF_NOT_FOUND = -1
  test.strictEquals(
    envKeys.indexOf('APP_LOG_MOCKED_DB') !== INDEX_OF_NOT_FOUND,
    true,
    'should have env key LOG_MOCKED_DB'
  )
  test.strictEquals(
    envKeys.indexOf('APP_LOG_LEVELS') !== INDEX_OF_NOT_FOUND,
    true,
    'should have env key LOG_LEVELS'
  )
  test.strictEquals(
    envKeys.indexOf('APP_LOG_GROUPS') !== INDEX_OF_NOT_FOUND,
    true,
    'should have env key LOG_GROUPS'
  )
  const appEnvCount = envKeys.filter(function handleFilter(envKey) {
    return envKey.startsWith('APP_')
  }).length
  const EXPECTED_APP_ENV_COUNT = 5
  test.strictEquals(
    appEnvCount,
    EXPECTED_APP_ENV_COUNT,
    'should have 6 envs with prefix "APP_"'
  )
  test.done()
})
