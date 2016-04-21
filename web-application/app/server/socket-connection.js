function create(interactions, log) {
  const startIndex = 0
  const lastIndex = -1
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
      log.actions.add({
        level: log.levels.info,
        group: log.groups.wsServer,
        message: 'A client disconnected.'
      })
      event$Subscription.unsubscribe()
    })
  }
}

module.exports = {
  create
}
