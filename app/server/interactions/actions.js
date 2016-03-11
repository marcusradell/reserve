function create(clientEvent$, serverActions) {
  clientEvent$.subscribe(function handleSubscribe(eventData) {
    /* eslint-disable max-len */
    serverActions[eventData.header.namespace][eventData.header.eventName](eventData.body)
    /* eslint-enable max-len */
  })
}

module.exports = {
  create
}
