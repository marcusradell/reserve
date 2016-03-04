const Rx = require('rx')

function createEvent$() {
  const second = 1000
  return (
    Rx.Observable
    .interval(second)
    .timeInterval()
    .map(function handleMap(value) {
      return JSON.stringify(value)
    })
  )
}

module.exports = {
  createEvent$
}
