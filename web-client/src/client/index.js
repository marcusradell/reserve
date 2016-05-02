import React from 'react'
import ReactDom from 'react-dom'
import Rx from 'rxjs'
import chatFactory from 'reserve-common/lib/components/chat'
import connectionFactory from 'reserve-common/lib/components/connection'
import eventsFactory from './events'
import io from 'socket.io-client'
import rendererFactory from './renderer'
import socketFactory from './socket'
import stateFactory from './state'

function create() {
  const connection = connectionFactory.create()
  const clientChat = chatFactory.create('client-chat')
  const serverChatNamespace = 'server-chat'
  const serverChat = chatFactory.create(serverChatNamespace)
  serverChat.events.event$.subscribe(() => { return console.log('TODO: Remove temp code. -MANI') })
  const actions = {}
  actions[serverChatNamespace] = serverChat.actions
  const events = eventsFactory.create(
    Rx,
    [
      clientChat.events.event$
    ]
  )
  socketFactory.create(io, {events, actions}, connection.actions)
  const state$ = stateFactory.create(
    Rx,
    connection.state.state$,
    clientChat.state.state$,
    serverChat.state.state$
  )
  const elements = {
    ConnectionElement: connection.renderer.render,
    ClientChatElement: clientChat.renderer.render,
    ServerChatElement: serverChat.renderer.render
  }
  rendererFactory.create(
    React, ReactDom, state$, elements
  )
}

export default {
  create
}
