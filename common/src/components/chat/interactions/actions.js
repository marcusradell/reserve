function create(events, inputActions) {
  function write() {
    events.write$.next()
  }

  return {
    write,
    setValue: inputActions.setValue
  }
}

export default {
  create
}
