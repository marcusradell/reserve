function create(Rx, events) {
  const stateSubject = new Rx.Subject()
  const initialState = {
    isConnected: false
  }

  events.connect$.subscribe(function onConnect() {
    stateSubject.next(function onStateChange() {
      return {
        isConnected: true
      }
    })
  })

  events.disconnect$.subscribe(function onConnect() {
    stateSubject.next(function onStateChange() {
      return {
        isConnected: false
      }
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
