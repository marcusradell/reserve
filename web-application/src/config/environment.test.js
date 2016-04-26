import environmentConfigFactory from './environment'
import tests from 'ava'

tests.cb('config environment', function handleRootTest(test) {
  const environmentConfigWithPrefix = environmentConfigFactory.create(
    {PREFIX_VARNAME: 'value'}, 'PREFIX_'
  )
  test.deepEquals(
    environmentConfigWithPrefix,
    {VARNAME: 'value'},
    'should create a config object without prefixes'
  )
  const environmentConfigWithoutPrefix = environmentConfigFactory.create(
    {VARNAME: 'value'}, 'PREFIX_'
  )
  test.deepEquals(
    environmentConfigWithoutPrefix,
    {},
    'should create a config object without prefixes'
  )
  test.end()
})
