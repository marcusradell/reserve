const Rx = require('rx')
const events = require('../events')
const stateSubject = new Rx.Subject()
const SPLICE_SELF = 1

events.login$.subscribe(function handleLoginSubscribe(loginData) {
  stateSubject.onNext(function handleOnNext(currentState) {
    // TODO: Pure array push. -MANI
    currentState.push(loginData)
    return currentState
  })
})

events.rename$.subscribe(function handleLoginSubscribe(renameData) {
  stateSubject.onNext(function handleOnNext(currentState) {
    // TODO: Make pure. -MANI
    const oldNameIndex = currentState.indexOf(renameData.oldName)
    currentState[oldNameIndex] = renameData.newName
  })
})

events.logout$.subscribe(function handleLoginSubscribe(logoutData) {
  stateSubject.onNext(function logoutEventHandler(currentState) {
    // TODO: Make pure. -MANI
    const nameIndex = currentState.indexOf(logoutData.name)
    currentState.splice(nameIndex, SPLICE_SELF)
    return currentState
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
