function create(Rx, inputEvents) {
  const write$ = new Rx.Subject()

  return {
    write$,
    setValue$: inputEvents.setValue$
  }
}

export default {
  create
}
