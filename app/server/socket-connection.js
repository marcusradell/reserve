function create(event$, log) {
  return function handleConnect(socket) {
    log.events.add(
      log.levels.info,
      log.groups.wsServer,
      'A client connected.'
    )
    const event$Subscription = event$.subscribe(function handleSubscribe(val) {
      socket.emit('event$', val)
    })
    socket.on('disconnect', function handleDisconnect() {
      log.events.add(
        log.levels.info,
        log.groups.wsServer,
        'A client disconnected.'
      )
      event$Subscription.unsubscribe()
    })
  }
}

module.exports = {
  create
}
