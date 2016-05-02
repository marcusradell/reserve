import SocketIo from 'socket.io'

const startIndex = 0
const lastIndex = -1

function socketConnectionCreate(interactions, log) {
  return function handleConnect(socket) {
    log.actions.info({
      group: log.groups.wsServer,
      message: 'A client connected.'
    })
    const event$Subscription = interactions.events.event$.subscribe(
      function handleSubscribe(data) {
        socket.emit('server-event', data)
      }
    )
    socket.on('client-event', function handleMessage(data) {
      // TODO: Make universal together with the common helper function and make it the router. -MANI
      try {
        const actionName = data.header.eventName.slice(startIndex, lastIndex)
        const namespace = data.header.namespace.replace('client-', '')
        interactions.actions[namespace][actionName](data.body)
        socket.broadcast.emit('server-event', data)
      } catch (error) {
        log.actions.error({
          group: log.groups.wsServer,
          message: `${error}
          data.header.namespace: ${data.header.namespace}
          data.header.eventName: ${data.header.eventName}
          data.body: ${data.body}`
        })
      }
    })
    socket.on('error', function onError(error) {
      log.actions.error({
        group: log.groups.wsServer,
        message: error
      })
    })
    socket.on('disconnect', function handleDisconnect() {
      log.actions.info({
        group: log.groups.wsServer,
        message: 'A client disconnected.'
      })
      event$Subscription.unsubscribe()
    })
  }
}

function create(httpServer, interactions, log) {
  const ioServer = SocketIo.listen(httpServer)
  ioServer.on(
    'connection',
    function onServerConnect(socket) {
      socketConnectionCreate(interactions, log)(socket)
    }
  )
}

export default {
  create
}
