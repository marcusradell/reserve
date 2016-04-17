import Rx from 'rxjs'
import eventStreamComposer from '../../helpers/eventsComposer'
import groups from './groups'
import levels from './levels'
import eventsFactory from './interactions/events'
import actionsFactory from './interactions/actions'

function create() {
  const events = eventsFactory.create(Rx)
  const actions = actionsFactory.create(events, levels)
  return {
    events,
    actions,
    groups
  }
}

export default {
  create
}
