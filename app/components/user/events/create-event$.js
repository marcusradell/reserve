const Rx = require('rx')
const event$ = new Rx.Subject()
const COMPONENT_NAME = 'user'
function create(events) {
  const event$Collection = []
  event$Collection.push(
    events.login$.map(function handleMap(data) {
      return {
        header: {
          component: COMPONENT_NAME,
          event: 'login'
        },
        body: data
      }
    })
  )
  event$Collection.push(
    events.rename$.map(function handleMap(data) {
      return {
        header: {
          component: COMPONENT_NAME,
          event: 'rename'
        },
        body: data
      }
    })
  )
  event$Collection.push(
    events.logout$.map(function handleMap(data) {
      return {
        header: {
          component: COMPONENT_NAME,
          event: 'logout'
        },
        body: data
      }
    })
  )
  return Rx.Observable.merge(event$Collection)
}

module.exports = {
  create
}
