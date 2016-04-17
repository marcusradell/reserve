function create(Rx) {
  const setValue$ = new Rx.Subject()
  return {
    setValue$
  }
}

export default {
  create
}
