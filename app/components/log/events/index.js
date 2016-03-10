const Rx = require('rxjs')

const addSubject = new Rx.Subject()

function add(level, group, message) {
  addSubject.next({
    level,
    group,
    message
  })
}

const add$ = addSubject.publish().refCount()

module.exports = {
  add$,
  add
}
