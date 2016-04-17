function create(events) {
  function setValue(data) {
    events.setValue$.next(data)
  }
  return {
    setValue
  }
}

export default {
  create
}
