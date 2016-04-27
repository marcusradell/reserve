// TODO: Make a pattern for excluding/including renderer. -MANI

import React from 'react'
import Rx from 'rxjs'
import actionsFactory from './interactions/actions'
import eventsFactory from './interactions/events'
import rendererFactory from './renderer'
import stateFactory from './state'

function create() {
  const events = eventsFactory.create(Rx)
  const actions = actionsFactory.create(events)
  const renderer = rendererFactory.create(React, actions)
  const state = stateFactory.create(Rx, events)
  return {
    actions,
    events,
    renderer,
    state
  }
}

export default {
  create
}
