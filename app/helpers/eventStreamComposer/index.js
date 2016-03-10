const Rx = require('rxjs/Rx')

function create(events, namespace) {
  const eventKeys = Object.keys(events)
  const event$Collection = eventKeys.map(function handleEventKeyMap(eventKey) {
    return events[eventKey].map(function handleEvent$Map(event$Data) {
      return {
        header: {
          namespace,
          event$Name: eventKey
        },
        body: event$Data
      }
    })
  })
  return Rx.Observable.merge(event$Collection)
}

module.exports = {
  create
}
