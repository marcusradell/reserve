function create(events) {
  function info(data) {
    events.info$.next({
      group: data.group,
      message: data.message
    })
  }

  function warning(data) {
    events.warning$.next({
      group: data.group,
      message: data.message
    })
  }

  function error(data) {
    events.error$.next({
      group: data.group,
      message: data.message
    })
  }

  return {
    info,
    warning,
    error
  }
}

export default {
  create
}
