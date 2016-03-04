const Rx = require('rx')

const add$ = new Rx.Subject()

function add(level, group, message) {
  add$.onNext({
    level,
    group,
    message
  })
}

module.exports = {
  add$,
  add
}
