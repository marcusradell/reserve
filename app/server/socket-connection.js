function create(event$, log) {
  return function handleConnect(socket) {
    log.events.add({
      level: log.levels.info,
      group: log.groups.wsServer,
      message: 'A client connected.'
    })
    const event$Subscription = event$.subscribe(function handleSubscribe(val) {
      socket.emit('event$', val)
    })

    // TODO: Continue here. -MANI
    // Setup a websocketstream that proxies client events to actions.
    const clientevent$ = Rx.Observable.fromSocket(socket, 'clientEvent')
    actionsFactory.create(clientEvent$)

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
