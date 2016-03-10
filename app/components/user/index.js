const Rx = require('rxjs')
const eventsFactory = require('./interactions/events')
const eventStreamComposer = require('../../helpers/eventStreamComposer')
const actionsFactory = require('./interactions/actions')
const repositoryFactory = require('./repository')

function create() {
  const events = eventsFactory.create(Rx, eventStreamComposer)
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
