import React from 'react'
import Rx from 'rxjs'
import actionsFactory from './interactions/actions'
import eventsComposer from '../../helpers/eventsComposer'
import eventsFactory from './interactions/events'
import inputFactory from '../input'
import rendererFactory from './renderer'
import stateFactory from './state'

function create(namespace) {
  const input = inputFactory.create()
  const events = eventsFactory.create(
    Rx, eventsComposer, namespace, input.events
  )
  const actions = actionsFactory.create(events, input.actions)
  const state = stateFactory.create(Rx, events, input.state)
  const renderer = rendererFactory.create(React, actions, input.renderer)
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
