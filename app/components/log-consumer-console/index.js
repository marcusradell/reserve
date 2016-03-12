// TODO: Write tests! Failed on Travis CI. -MANI
const INDEX_OF_NOT_FOUND = -1

function create(log, levelsFilter, groupsFilter) {
  log.events.add$
  .filter(function handleLevelsFilter(logData) {
    return !levelsFilter ||
    levelsFilter
    .split(',')
    .indexOf(logData.level) !== INDEX_OF_NOT_FOUND
  })
  .filter(function handleGroupsFilter(logData) {
    return !groupsFilter ||
      groupsFilter
      .split(',')
      .indexOf(logData.group) !== INDEX_OF_NOT_FOUND
  })
  .map(function functionName(logData) {
    return function produceLog() {
      const FIRST_LETTER = 0
      const message =
        `\n[${logData.level[FIRST_LETTER]}]` +
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
