import logConsumerFactory from './index'
import logFactory from '../log'
import mockWritersFactory from './writers/mock-writers'
import tests from 'ava'

tests.cb('log-consumer', function onTests(test) {
  const log = logFactory.create()
  // NOTE: Proxy is populated with the subscription later in the code. -MANI
  const subscriptionProxy = {}
  const writeStreamsMock = mockWritersFactory.create(
    function handleWrite(message) {
      test.deepEqual(
        message,
        {
          group: 'event',
          message: 'test'
        }
      )
      subscriptionProxy.subscription.unsubscribe()
      test.end()
    }
  )
  subscriptionProxy.subscription = logConsumerFactory.create(
    log,
    writeStreamsMock,
    {}
  ).subscription
  log.actions.error({
    group: log.groups.event,
    message: 'test'
  })
})
