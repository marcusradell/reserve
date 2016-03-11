function create(actions, events, log) {
  return function handleConnect(socket) {
    log.events.add({
      level: log.levels.info,
      group: log.groups.wsServer,
      message: 'A client connected.'
    })
    const event$Subscription = events.event$.subscribe(
      function handleSubscribe(val) {
        socket.emit('event$', val)
      }
    )
    socket.on('message', function handleMessage(clientEventData) {
      /* eslint-disable max-len */
      actions[clientEventData.header.namespace][clientEventData.header.eventName](clientEventData.body)
      /* eslint-enable max-len */
    })
    socket.on('disconnect', function handleDisconnect() {
      log.events.add({
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
