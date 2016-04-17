import React from 'react'
import Rx from 'rxjs'
import actionsFactory from './interactions/actions'
import eventsFactory from './interactions/events'
import inputFactory from '../input'
import reactionsFactory from './interactions/reactions'
import rendererFactory from './renderer'
import stateFactory from './state'

function create() {
  const input = inputFactory.create()
  const events = eventsFactory.create(Rx, input.events)
  const actions = actionsFactory.create(events, input.actions)
  const state = stateFactory.create(Rx, events, input.state)
  const renderer = rendererFactory.create(React, actions, input.renderer)
  reactionsFactory.create(actions, events)
  return {
    events,
    actions,
    state,
    renderer
  }
}

export default {
  create
}
