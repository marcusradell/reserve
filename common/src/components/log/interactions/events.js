function create(Rx) {
  const info$ = new Rx.Subject()
  const warning$ = new Rx.Subject()
  const error$ = new Rx.Subject()
  return {
    info$,
    warning$,
    error$
  }
}

export default {
  create
}
