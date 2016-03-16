// TODO: Redo log actions to have an action per level and remove levels.js. -MANI

const Rx = require('rxjs')
const groups = require('./groups')
const levels = require('./levels')
const eventsFactory = require('./interactions/events')
const actionsFactory = require('./interactions/actions')

function create() {
  const events = eventsFactory.create(Rx)
  const actions = actionsFactory.create(events)
  return {
    events,
    actions,
    groups,
    levels
  }
}

module.exports = {
  create
}
