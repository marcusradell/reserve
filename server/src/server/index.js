import Rx from 'rxjs'
import SocketIo from 'socket.io'
import chatFactory from 'reserve-common/lib/components/chat'
import configFactory from '../config'
import eventsFactory from './interactions/events'
import http from 'http'
import logConsumerFactory from 'reserve-common/lib/components/log-consumer'
import logFactory from 'reserve-common/lib/components/log'
import sentryWritersFactory from
  'reserve-common/lib/components/log-consumer/writers/sentry-writers'
import socketConnectionFactory from './socket-connection'
import stdWritersFactory from
  'reserve-common/lib/components/log-consumer/writers/sentry-writers'
import userFactory from 'reserve-common/lib/components/user'

function closeFactory(server, log) {
  return function close () {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        log.actions.info({
          group: log.groups.httpServer,
          message: 'Server closed'
        })
        resolveClose()
      })
    })
  }
}

function httpServerListen(serverData, log) {
  return new Promise(function handleCreatePromise(resolve) {
    serverData.httpServer.listen(
      serverData.port,
      serverData.host,
      function handleServerListen() {
        log.actions.info({
          group: log.groups.httpServer,
          message: 'Listening on ' +
          `[${serverData.httpServer.address().address}:` +
          `${serverData.httpServer.address().port}]`
        })
        resolve()
      }
    )
  })
}

function createSetupIoServerFn(httpServer, interactions, log) {
  return function handleThenSetupIoServer() {
    const ioServer = SocketIo.listen(httpServer)
    ioServer.on(
      'connection',
      socketConnectionFactory.create(interactions, log)
    )
  }
}

// TODO: Fix too many statements eslint error. -MANI
/* eslint-disable max-statements */
function create() {
  const log = logFactory.create()
  const config = configFactory.create()
  const httpServer = http.createServer()
  const userNamespace = 'user'
  const chatNamespace = 'chat'
  const user = userFactory.create(userNamespace)
  const chat = chatFactory.create(chatNamespace)
  const actions = {}
  actions[userNamespace] = user.actions
  actions[chatNamespace] = chat.actions
  const events = eventsFactory.create(
    Rx,
    [
      user.events.event$,
      chat.events.event$
    ]
  )
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
  log.actions.info({
    group: log.groups.httpServer,
    message: `Server starting with NODE_ENV: [${process.env.NODE_ENV}]`
  })
  // TODO: Obfuscate values before logging. -MANI
  const JSON_SPACING = 2
  log.actions.info({
    group: log.groups.httpServer,
    message: `Config loaded with keys: \n` +
    `CONFIG START\n` +
    `${JSON.stringify(Object.keys(config), null, JSON_SPACING)}` +
    `\nCONFIG END`
  })
  events.event$.subscribe(function logEvent(eventData) {
    log.actions.info({
      group: log.groups.event,
      message: JSON.stringify(eventData, null, JSON_SPACING)
    })
  })
  return httpServerListen(
    {
      httpServer,
      port: config.PORT,
      host: config.HOST
    },
    log
  )
  .then(
    createSetupIoServerFn(
      httpServer,
      {
        events,
        actions
      },
       log
    )
  )
  .then(function handleThenReturnServerData() {
    return {
      httpServer,
      close: closeFactory(httpServer, log),
      config
    }
  })
}
/* eslint-enable max-statements */

export default {
  create
}
