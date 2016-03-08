const Rx = require('rx')

const addSubject = new Rx.Subject()

function add(level, group, message) {
  addSubject.onNext({
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
