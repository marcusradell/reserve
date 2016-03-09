// TODO: Write tests -MANI

function createLoginHandler(stateSubject) {
  return function handleLogin(loginData) {
    stateSubject.onNext(function handleOnNext(currentState) {
      // TODO: Pure array push. -MANI
      currentState.push(loginData)
      return currentState
    })
  }
}

function createRenameHandler(stateSubject) {
  return function handleRename(renameData) {
    stateSubject.onNext(function handleOnNext(currentState) {
      const withoutOldNameState = currentState.filter(
        function handleFilter(userData) {
          return userData.name !== renameData.oldName
        }
      )
      withoutOldNameState.push({name: renameData.newName})
      return withoutOldNameState
    })
  }
}

function createLogoutHandler(stateSubject) {
  return function handleLogout(logoutData) {
    stateSubject.onNext(function logoutEventHandler(currentState) {
      // TODO: Make pure. -MANI
      return currentState.filter(function handleFilter(userData) {
        return userData.name !== logoutData.name
      })
    })
  }
}

function create(Rx, events) {
  const stateSubject = new Rx.Subject()
  events.login$.subscribe(createLoginHandler(stateSubject))
  events.rename$.subscribe(createRenameHandler(stateSubject))
  events.logout$.subscribe(createLogoutHandler(stateSubject))
  const state$ = stateSubject
    .startWith([])
    .scan(function handleStateScan(currentState, handleEvent) {
      return handleEvent(currentState)
    })
  return {
    state$
  }
}

module.exports = {
  create
}
