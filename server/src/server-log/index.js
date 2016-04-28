import logConsumerFactory from 'reserve-common/lib/components/log-consumer'
import logFactory from 'reserve-common/lib/components/log'
import sentryWritersFactory from
  'reserve-common/lib/components/log-consumer/writers/sentry-writers'
import stdWritersFactory from
'reserve-common/lib/components/log-consumer/writers/std-writers'

const namespace = 'serverLog'

function create(config) {
  const log = logFactory.create(namespace)
  logConsumerFactory.create(
    log,
    stdWritersFactory.create(),
    {
      groupsFilter: config.LOG_GROUPS
    }
  )
  if (config.SENTRY) {
    logConsumerFactory.create(
      log,
      sentryWritersFactory.create(config.SENTRY),
      {
        groupsFilter: null
      }
    )
  }
  return log;
}

export default {
  create
}
