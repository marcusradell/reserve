import React from 'react'
import ReactDom from 'react-dom'
import connectionFactory from './components/connection'
import io from 'socket.io-client'

function create() {
  const connection = connectionFactory.create()
  const ConnectionElement = connection.renderer.render
  connection.state.state$
    // TODO: Set state={state.connection} -MANI
    .map((state) => <ConnectionElement state={state} />)
    .subscribe((app) => {
      ReactDom.render(app, document.querySelector('[data-app]'))
    })
  const socket = io('http://0.0.0.0:8888/')
  socket.on('connect', function onConnect() {
    connection.actions.connect()
  })
  socket.on('disconnect', function onDisconnect() {
    connection.actions.disconnect()
  })
}

create()
