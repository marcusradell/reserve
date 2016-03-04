const groups = require('./groups')
const levels = require('./levels')
const Rx = require('rx')
const log$ = new Rx.Subject()

function add(level, group, message) {
  log$.onNext({
    level,
    group,
    message
  })
}

module.exports = {
  add,
  log$,
  groups,
  levels
}
