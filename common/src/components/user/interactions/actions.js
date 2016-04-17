function create(events) {
  function login(data) {
    events.login$.next(data)
  }

  function rename(data) {
    events.rename$.next(data)
  }

  function logout(data) {
    events.logout$.next(data)
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
