function create(Rx) {
  const connect$ = new Rx.Subject()
  const disconnect$ = new Rx.Subject()
  return {
    connect$,
    disconnect$
  }
}

export default {
  create
}
