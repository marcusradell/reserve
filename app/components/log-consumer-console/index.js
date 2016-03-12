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
      // TODO: Fix so it works with Travis CI. -MANI
      // const FIRST_LETTER = 0
      const message =
        // `\n[${logData.level[FIRST_LETTER]}]` +
        `\n[${logData.level}]` +
        `[${logData.group}]:` +
        ` ${logData.message}\n`
      switch (logData.level) {
      case log.levels.info:
        return process.stdout.write(message)
      case log.levels.warning:
        return process.stderr.write(message)
      case log.levels.error:
        return process.stderr.write(message)
      default:
        return process.stderr.write(message)
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
