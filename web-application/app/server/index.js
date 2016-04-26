// TODO: Make whole project ES6 style or node v6 if it supports modules. -MANI
const http = require('http')
const SocketIo = require('socket.io')
const Rx = require('rxjs')
const logFactory = require('reserve-common/lib/components/log').default
const userFactory = require('reserve-common/lib/components/user').default
const chatFactory = require('reserve-common/lib/components/chat').default
const logConsumerFactory = require(
  'reserve-common/lib/components/log-consumer'
  ).default
const socketConnectionFactory = require('./socket-connection')
const configFactory = require('../config')
const eventsFactory = require('./interactions/events')
const writeStreamsSentryFactory = require(
  'reserve-common/lib/components/log-consumer/write-streams-sentry'
).default

function closeFactory(server, log) {
  return function close () {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        log.actions.add({
          level: log.levels.info,
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
        log.actions.add({
          level: log.levels.info,
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
    logConsumerFactory.writeStreamsFactory.create(),
    {
      levelsFilter: config.LOG_LEVELS,
      groupsFilter: config.LOG_GROUPS
    }
  )
  if (config.SENTRY) {
    logConsumerFactory.create(
      log,
      writeStreamsSentryFactory.create(config.SENTRY),
      {
        levelsFilter: log.levels.error,
        groupsFilter: null
      }
    )
  }
  log.actions.add({
    level: log.levels.info,
    group: log.groups.httpServer,
    message: `Server starting with NODE_ENV: [${process.env.NODE_ENV}]`
  })
  // TODO: Obfuscate values before logging. -MANI
  const JSON_SPACING = 2
  log.actions.add({
    level: log.levels.info,
    group: log.groups.httpServer,
    message: `Config loaded with keys: \n` +
    `CONFIG START\n` +
    `${JSON.stringify(Object.keys(config), null, JSON_SPACING)}` +
    `\nCONFIG END`
  })
  events.event$.subscribe(function logEvent(eventData) {
    log.actions.add({
      level: log.levels.info,
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

module.exports = {
  create
}
