// TODO: redo in ES6. -MANI
const tests = require('tap')
const logFactory = require('./index')

// TODO: Determine how to handle E2E tests differently than unit tests. -MANI
tests.test('log E2E', function handleTests(test) {
  const log = logFactory.create()
  const logObjectKeys = Object.keys(log)
  const NUMBER_OF_OBJECT_KEYS = 4
  test.strictEquals(
    logObjectKeys.length,
    NUMBER_OF_OBJECT_KEYS,
    'should contain strictly 4 keys'
  )
  const addSubscriber = log.events.add$
  .subscribe(function handleSubscribe(data) {
    addSubscriber.unsubscribe()
    test.deepEquals(
      data,
      {
        level: 'error',
        group: 'event',
        message: 'test'
      },
    'should get logged message.')
    test.done()
  })
  log.actions.add({
    level: log.levels.error,
    group: log.groups.event,
    message: 'test'})
})
