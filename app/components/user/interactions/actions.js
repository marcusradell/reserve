function create(events) {
  function login(name) {
    events.login$.next({name})
  }

  function rename(oldName, newName) {
    events.rename$.next({oldName, newName})
  }

  function logout(name) {
    events.logout$.next({name})
  }

  return {
    login,
    rename,
    logout
  }
}

module.exports = {
  create
}
