function create(Rx, eventsComposer, namespace) {
  const login$ = new Rx.Subject()
  const rename$ = new Rx.Subject()
  const logout$ = new Rx.Subject()

  return eventsComposer.create(
    {
      login$,
      rename$,
      logout$
    },
    namespace
  )
}

module.exports = {
  create
}
