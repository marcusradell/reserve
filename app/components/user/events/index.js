const Rx = require('rx')

const login$ = new Rx.Subject()

function login(name) {
  login$.onNext({name})
}

const rename$ = new Rx.Subject()

function rename(oldName, newName) {
  rename$.onNext({oldName, newName})
}

const logout$ = new Rx.Subject()

function logout(name) {
  logout$.onNext({name})
}

module.exports = {
  login,
  login$,
  rename,
  rename$,
  logout,
  logout$
}
