function create(io, events, connectionActions) {
  const socket = io('http://0.0.0.0:8888/')
  socket.on('connect', function onConnect() {
    connectionActions.connect()
  })
  socket.on('disconnect', function onDisconnect() {
    connectionActions.disconnect()
  })
  events.event$.subscribe(function onEvent(data) {
    debugger;
    socket.emit('message', data)
  })
}

export default {
  create
}
