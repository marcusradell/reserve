const Rx = require('rx')
const createEvent$ = require('./create-event$')

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

const actions = {
  login,
  rename,
  logout
}

const events = {
  login$,
  rename$,
  logout$
}

const event$ = createEvent$.create(events)
events.event$ = event$

module.exports = {
  events,
  actions
}
