import React from 'react'
import ReactDom from 'react-dom'
import Rx from 'rxjs'
import chatFactory from '../components/chat'
import connectionFactory from '../components/connection'
import eventsFactory from './events'
import io from 'socket.io-client'
import rendererFactory from './renderer'
import socketFactory from './socket'
import stateFactory from './state'

function create() {
  const connection = connectionFactory.create()
  const chat = chatFactory.create('chat')
  const events = eventsFactory.create(
    Rx,
    [
      chat.events.event$
    ]
  )
  socketFactory.create(io, events, connection.actions)
  const state$ = stateFactory.create(
    Rx,
    connection.state.state$,
    chat.state.state$
  )
  const elements = {
    ConnectionElement: connection.renderer.render,
    ChatElement: chat.renderer.render
  }
  rendererFactory.create(
    React, ReactDom, state$, elements
  )
}

export default {
  create
}
