import environmentConfigFactory from './environment'
import tests from 'ava'

tests('config environment', function handleRootTest(test) {
  const environmentConfigWithPrefix = environmentConfigFactory.create(
    {PREFIX_VARNAME: 'value'}, 'PREFIX_'
  )
  test.deepEqual(
    environmentConfigWithPrefix,
    {VARNAME: 'value'},
    'should create a config object without prefixes'
  )
  const environmentConfigWithoutPrefix = environmentConfigFactory.create(
    {VARNAME: 'value'}, 'PREFIX_'
  )
  test.deepEqual(
    environmentConfigWithoutPrefix,
    {},
    'should create a config object without prefixes'
  )
})
