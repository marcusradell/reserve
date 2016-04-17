function create(Rx, events) {
  const stateSubject = new Rx.Subject()
  const initialState = {
    value: ''
  }

  events.setValue$.subscribe(function onSetValue$(data) {
    stateSubject.next(function onStateChange(state) {
      state.value = data
      return state
    })
  })

  const state$ = stateSubject
  .startWith(initialState)
  .scan(function onScan(currentState, stateChanger) {
    return stateChanger(currentState)
  })
  return {
    state$
  }
}

export default {
  create
}
