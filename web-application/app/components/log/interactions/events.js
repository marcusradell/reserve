function create(Rx) {
  const addSubject = new Rx.Subject()
  return {
    add$: addSubject
  }
}

module.exports = {
  create
}
