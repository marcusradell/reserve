function create(log) {
  log.log$.subscribe(function handleLogSubscribe(logData) {
    /* eslint-disable no-console */
    console.log(
      `[${logData.level}] [${logData.group}]: ${logData.message}`
    )
    /* eslint-enable no-console */
  })
}

module.exports = {
  create
}
