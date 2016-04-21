import Rx from 'rxjs'
import actionsFactory from './interactions/actions'
import eventsComposer from '../../helpers/eventsComposer'
import eventsFactory from './interactions/events'
import repositoryFactory from './repository'

function create(namespace) {
  const events = eventsFactory.create(Rx, eventsComposer, namespace)
  const actions = actionsFactory.create(events)
  const repository = repositoryFactory.create(Rx, events)

  return {
    repository,
    actions,
    events
  }
}

export default {
  create
}
