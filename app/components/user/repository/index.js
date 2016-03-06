const Rx = require('rx')
const behaviors = require('../behaviors')
const stateSubject = new Rx.Subject()

behaviors.events.login$.subscribe(function handleLoginSubscribe(loginData) {
  stateSubject.onNext(function handleOnNext(currentState) {
    // TODO: Pure array push. -MANI
    currentState.push(loginData)
    return currentState
  })
})

behaviors.events.rename$.subscribe(function handleRenameSubscribe(renameData) {
  stateSubject.onNext(function handleOnNext(currentState) {
    const withoutOldNameState = currentState.filter(
      function handleFilter(userData) {
        return userData.name !== renameData.oldName
      }
    )
    withoutOldNameState.push({name: renameData.newName})
    return withoutOldNameState
  })
})

behaviors.events.logout$.subscribe(function handleLoginSubscribe(logoutData) {
  stateSubject.onNext(function logoutEventHandler(currentState) {
    // TODO: Make pure. -MANI
    return currentState.filter(function handleFilter(userData) {
      return userData.name !== logoutData.name
    })
  })
})

const state$ = stateSubject
  .startWith([])
  .scan(function handleStateScan(currentState, handleEvent) {
    return handleEvent(currentState)
  })

module.exports = {
  state$
}
