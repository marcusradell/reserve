// TODO: Write tests -MANI

function createLoginHandler(stateSubject) {
  return function handleLogin(loginData) {
    stateSubject.next(function handlenext(currentState) {
      return [...currentState, loginData]
    })
  }
}

function createRenameHandler(stateSubject) {
  return function handleRename(renameData) {
    stateSubject.next(function handlenext(currentState) {
      currentState.find(function handleFind(userData) {
        return userData.name === renameData.oldName
      }).name = renameData.newName
    })
  }
}

function createLogoutHandler(stateSubject) {
  return function handleLogout(logoutData) {
    stateSubject.next(function logoutEventHandler(currentState) {
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
