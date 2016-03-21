function create(events) {
  function write(data) {
    events.write$.next(data)
  }

  function commit() {
    // TODO: -MANI
  }

  return {
    write,
    commit
  }
}

module.exports = {
  create
}
