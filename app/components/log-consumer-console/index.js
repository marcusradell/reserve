const INDEX_OF_NOT_FOUND = -1

function create(log, levels, groups) {
  log.events.add$
  .filter(function handleLevelsFilter(logData) {
    return !levels ||
    levels
    .split(',')
    .indexOf(logData.level) !== INDEX_OF_NOT_FOUND
  })
  .filter(function handleGroupsFilter(logData) {
    return !groups ||
      groups
      .split(',')
      .indexOf(logData.group) !== INDEX_OF_NOT_FOUND
  })
  .map(function functionName(logData) {
    return function produceLog() {
      const FIRST_LETTER = 0
      const message =
        `[${logData.level[FIRST_LETTER]}]` +
        `[${logData.group}]:` +
        ` ${logData.message}`
      /* eslint-disable no-console */
      switch (logData.level) {
      case log.levels.info:
        return console.info(message)
      case log.levels.warning:
        return console.error(message)
      case log.levels.error:
        return console.error(message)
      default:
        return console.log(message)
      /* eslint-enable no-console */
      }
    }
  })
  .subscribe(function handleLogSubscribe(produceLog) {
    produceLog()
  })
}

module.exports = {
  create
}
