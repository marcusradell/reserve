function create(Rx, event$Composer) {
  const login$ = new Rx.Subject()
  const rename$ = new Rx.Subject()
  const logout$ = new Rx.Subject()

  const events = {
    login$,
    rename$,
    logout$
  }

  const event$Collection = event$Composer.create(events)
  events.event$Collection = event$Collection

  return events
}

module.exports = {
  create
}
