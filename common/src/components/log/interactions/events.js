function create(Rx, eventsComposer, namespace) {
  const info$ = new Rx.Subject()
  const warning$ = new Rx.Subject()
  const error$ = new Rx.Subject()
  return eventsComposer.create(
    {
      info$,
      warning$,
      error$
    },
    namespace
  )
}

export default {
  create
}
