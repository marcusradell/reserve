function create(Rx, events, inputState) {
  const messageStateSubject = new Rx.Subject()
  const initialState = []

  events.write$
  .withLatestFrom(
    inputState.state$,
    function onWithLatestFrom(_undefinedData, inputStateData) {
      return inputStateData
    }
  )
  .subscribe(function onWrite(messageData) {
    messageStateSubject.next(function onStateChange(state) {
      return state.concat(messageData.value)
    })
  })

  const messageState$ = messageStateSubject
    .startWith(initialState)
    .scan(function onScan(currentState, stateChanger) {
      return stateChanger(currentState)
    })

  const state$ = Rx.Observable.combineLatest(
    messageState$,
    inputState.state$,
    function onCombineLatest(messageStateData, inputStateData) {
      return {
        messages: messageStateData,
        input: inputStateData
      }
    }
  )

  return {
    state$
  }
}

export default {
  create
}
