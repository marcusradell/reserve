import React from 'react'
import ReactDom from 'react-dom'
import Rx from 'rxjs'
import chatFactory from '../components/chat'
import connectionFactory from '../components/connection'
import io from 'socket.io-client'
import rendererFactory from './renderer'
import socketFactory from './socket'
import stateFactory from './state'

function create() {
  const connection = connectionFactory.create()
  const chat = chatFactory.create()
  socketFactory.create(io, connection.actions)
  const state$ = stateFactory.create(
    Rx,
    connection.state.state$,
    chat.state.state$
  )
  const elements = {
    ConnectionElement: connection.renderer.render,
    ChatElement: chat.renderer.render
  }
  const renderer = rendererFactory.create(
    React, ReactDom, state$, elements
  )
  renderer.initialize()
}

export default {
  create
}
