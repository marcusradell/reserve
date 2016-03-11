const tests = require('tap')
const logFactory = require('./index')

tests.test('log', function handleTests(test) {
  const log = logFactory.create()
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
