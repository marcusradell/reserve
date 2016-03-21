const Rx = require('rxjs')
const eventStreamComposer = require('../../helpers/eventsComposer')
const eventsFactory = require('./interactions/events')
const actionsFactory = require('./interactions/actions')
const repositoryFactory = require('./repository')

function create(namespace) {
  const events = eventsFactory.create(Rx, eventStreamComposer, namespace)
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
