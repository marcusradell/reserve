// TODO: Rename parent folder to app. -MANI
import Rx from 'rxjs'
import chatFactory from 'reserve-common/lib/components/chat'
import configFactory from '../config'
import eventsFactory from './interactions/events'
import serverFactory from '../http-server'
import serverLogFactory from '../server-log'
import userFactory from 'reserve-common/lib/components/user'
import websocketServerFactory from '../websocket-server'

const JSON_SPACING = 2

function announceStartup(log) {
  log.actions.info({
    group: log.groups.httpServer,
    message: `Application starting with NODE_ENV: [${process.env.NODE_ENV}]`
  })
  log.actions.info({
    group: log.groups.httpServer,
    message: `Config loaded with keys: \n` +
    `CONFIG START\n` +
    `${JSON.stringify(Object.keys(config), null, JSON_SPACING)}` +
    `\nCONFIG END`
  })
}

// TODO: Fix too many statements eslint error. -MANI
/* eslint-disable max-statements */
function create() {
  const config = configFactory.create()
  const log = serverLogFactory.create(config)
  const serverDataPromise = serverFactory.create(config, log)
  // TODO: Solve isolation of actions while namespaces are needed at create-time. -MANI
  // Maybe export the namespaces from actions module? Maybe change when namespaces are resolved? Second sounds better.
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
  announceStartup(log)
  events.event$.subscribe(function logEvent(eventData) {
    log.actions.info({
      group: log.groups.event,
      message: JSON.stringify(eventData, null, JSON_SPACING)
    })
  })
  return serverDataPromise.then(function onThen(serverData) {
    websocketServerFactory.create(
      serverData.server,
      {
        events,
        actions
      },
       log
    )
    return serverData
  })
  .then(function onThenReturnServerData(serverData) {
    return serverData
  })
}
/* eslint-enable max-statements */

export default {
  create
}
