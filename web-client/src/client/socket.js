function create(io, events, connectionActions) {
  const socket = io('http://0.0.0.0:8888/')
  socket.on('connect', function onConnect() {
    connectionActions.connect()
  })
  socket.on('disconnect', function onDisconnect() {
    connectionActions.disconnect()
  })
  socket.on('server-event', function onServerEvent(data) {
    debugger;
    // TODO: fire off action. -MANI
  })
  events.event$.subscribe(function onEvent(data) {
    socket.emit('client-event', data)
  })
}

export default {
  create
}
