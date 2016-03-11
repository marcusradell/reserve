function create(Rx, event$Array) {
  return {
    event$: Rx.merge(...event$Array)
  }
}

module.exports = {
  create
}
