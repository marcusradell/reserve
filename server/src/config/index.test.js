import configFactory from './index'
import tests from 'ava'

/* eslint-disable max-statements */
tests('config', function onConfigTest(test) {
  /* eslint-enable max-statements */
  const config = configFactory.create(configFactory.prefixRsrv)
  const configKeys = Object.keys(config)
  test.is(
    configFactory.prefixRsrv,
    'RSRV_'
  )
  test.is(
    Boolean(process.env.NODE_ENV.length),
    true
  )
  test.is(
    Boolean(config.PORT.length),
    true
  )
  test.is(
    Boolean(config.HOST.length),
    true
  )
  const INDEX_OF_NOT_FOUND = -1
  test.is(
    configKeys.indexOf('LOG_LEVELS') !== INDEX_OF_NOT_FOUND,
    true,
    'should have config variable LOG_LEVELS'
  )
  test.is(
    configKeys.indexOf('LOG_GROUPS') !== INDEX_OF_NOT_FOUND,
    true,
    'should have config variable LOG_GROUPS'
  )
  test.is(
    configKeys.indexOf('SENTRY') !== INDEX_OF_NOT_FOUND,
    true,
    'should have config variable SENTRY'
  )
  test.is(
    configKeys.indexOf('SENDGRID') !== INDEX_OF_NOT_FOUND,
    true,
    'should have config variable SENDGRID'
  )
  test.is(
    configKeys.indexOf('AUTHY') !== INDEX_OF_NOT_FOUND,
    true,
    'should have config variable AUTHY'
  )
  const EXPECTED_CONFIG_LENGTH = 9
  test.is(
    configKeys.length,
    EXPECTED_CONFIG_LENGTH,
    'should have the right number of config variables'
  )
})
