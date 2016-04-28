import SocketIo from 'socket.io'

const startIndex = 0
const lastIndex = -1

function socketConnectionCreate(interactions, log) {
  return function handleConnect(socket) {
    console.log('MARK22')
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
      try {
        const actionName = data.header.eventName.slice(startIndex, lastIndex)
        interactions.actions[data.header.namespace][actionName](data.body)
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
      console.log('MARK21')
      socketConnectionCreate(interactions, log)(socket)
    }
  )
}

export default {
  create
}
