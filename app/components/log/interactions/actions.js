function create(Rx, events) {

  function add(data) {
    events.add$.next({
      level: data.level,
      group: data.group,
      message: data.message
    })
  }

  return {
    add
  }
}

module.exports = {
  create
}
