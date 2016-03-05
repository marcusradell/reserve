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
  .subscribe(function handleLogSubscribe(logData) {
    const FIRST_LETTER = 0
    /* eslint-disable no-console */
    console.log(
      `[${logData.level[FIRST_LETTER]}]` +
      `[${logData.group}]:` +
      `${logData.message}`
    )
    /* eslint-enable no-console */
  })
}

module.exports = {
  create
}
