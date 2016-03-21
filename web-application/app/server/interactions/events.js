function create(Rx, event$Array) {
  return {
    event$: Rx.Observable.merge(...event$Array)
  }
}

module.exports = {
  create
}
