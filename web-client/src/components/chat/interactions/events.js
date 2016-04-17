function create(Rx, eventsComposer, namespace, inputEvents) {
  const write$ = new Rx.Subject()

  return eventsComposer.create(
    {
      write$,
      setValue$: inputEvents.setValue$
    },
    namespace
  )
}

export default {
  create
}
