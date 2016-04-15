function create(events) {
  function connect() {
    events.connect$.next()
  }

  function disconnect() {
    events.disconnect$.next()
  }

  return {
    connect,
    disconnect
  }
}

export default {
  create
}
