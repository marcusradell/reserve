function create(Rx, event$Array) {
  return {
    event$: Rx.Observable.merge(...event$Array)
  }
}

export default {
  create
}
