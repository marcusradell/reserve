const startIndex = 0
const lastIndex = -1

function create(io, interactions, connectionActions) {
  const socket = io('http://0.0.0.0:8888/')
  socket.on('connect', function onConnect() {
    connectionActions.connect()
  })
  socket.on('disconnect', function onDisconnect() {
    connectionActions.disconnect()
  })
  socket.on('server-event', function onServerEvent(data) {
    try {
      const actionName = data.header.eventName.slice(startIndex, lastIndex)
      interactions.actions['server-' + data.header.namespace][actionName](data.body)
    } catch (error) {
      // TODO: Log with Log component. -MANI
      console.log(error)
    }
  })
  interactions.events.event$.subscribe(function onEvent(data) {
    socket.emit('client-event', data)
  })
}

export default {
  create
}
