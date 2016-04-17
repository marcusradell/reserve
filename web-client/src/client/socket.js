function create(io, connectionActions) {
  const socket = io('http://0.0.0.0:8888/')
  socket.on('connect', function onConnect() {
    connectionActions.connect()
  })
  socket.on('disconnect', function onDisconnect() {
    connectionActions.disconnect()
  })
}

export default {
  create
}
