function create(interactions, log) {
  return function handleConnect(socket) {
    log.actions.add({
      level: log.levels.info,
      group: log.groups.wsServer,
      message: 'A client connected.'
    })
    const event$Subscription = interactions.events.event$.subscribe(
      function handleSubscribe(val) {
        socket.emit('event$', val)
      }
    )
    socket.on('message', function handleMessage(data) {
      /* eslint-disable max-len */
      interactions.actions[data.header.namespace][data.header.action](data.body)
      /* eslint-enable max-len */
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
