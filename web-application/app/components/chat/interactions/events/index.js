function create(Rx, eventsComposer, namespace) {
  const write$ = new Rx.Subject()

  return eventsComposer.create(
    {
      write$
    },
    namespace
  )
}

module.exports = {
  create
}
