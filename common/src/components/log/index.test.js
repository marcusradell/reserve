import logFactory from './index'
import tests from 'ava'

tests.cb('log', function handleTests(test) {
  const log = logFactory.create()
  const addSubscriber = log.events.error$
  .subscribe(function handleSubscribe(data) {
    addSubscriber.unsubscribe()
    test.deepEqual(
      data,
      {
        group: 'event',
        message: 'test'
      }
    )
    test.end()
  })
  log.actions.error({
    group: log.groups.event,
    message: 'test'
  })
})
