function create(event$, log) {
  return function handleConnect(socket) {
    log.events.add(
      log.levels.info,
      log.groups.httpServer,
      'A client connected.'
    )
    const event$Unsubscribe = event$.subscribe(function handleSubscribe(val) {
      socket.emit('event$', val)
    })
    socket.on('disconnect', function handleDisconnect() {
      log.events.add(
        log.levels.info,
        log.groups.wsServer,
        'A client disconnected.'
      )
      event$Unsubscribe.dispose()
    })
    require('../components/user').events.login('userme')
    require('../components/user').events.rename('userme', 'useru')
    require('../components/user').events.logout('useru')
  }
}

module.exports = {
  create
}
