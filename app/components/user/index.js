const Rx = require('rxjs')
const eventsFactory = require('./interactions/events')
const event$Composer = require('../../helpers/event$Composer')
const actionsFactory = require('./interactions/actions')
const repositoryFactory = require('./repository')

function create() {
  const events = eventsFactory.create(Rx, event$Composer)
  const actions = actionsFactory.create(events)
  const repository = repositoryFactory.create(Rx, events)

  return {
    repository,
    actions,
    events
  }
}

module.exports = {
  create
}
