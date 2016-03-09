function create(events) {
  function login(name) {
    events.login$.onNext({name})
  }

  function rename(oldName, newName) {
    events.rename$.onNext({oldName, newName})
  }

  function logout(name) {
    events.logout$.onNext({name})
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
