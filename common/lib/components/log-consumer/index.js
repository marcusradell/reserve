'use strict';

var INDEX_OF_NOT_FOUND = -1;
var defaultWriteStreamsFactory = require('./write-streams');

function create(log, writeStreams, options) {
  return log.events.add$.filter(function handleLevelsFilter(logData) {
    return !options.levelsFilter || options.levelsFilter.split(',').indexOf(logData.level) !== INDEX_OF_NOT_FOUND;
  }).filter(function handleGroupsFilter(logData) {
    return !options.groupsFilter || options.groupsFilter.split(',').indexOf(logData.group) !== INDEX_OF_NOT_FOUND;
  }).map(function functionName(logData) {
    return function produceLog() {
      var FIRST_LETTER = 0;
      var message = '\n[' + logData.level[FIRST_LETTER] + ']' + ('[' + logData.group + ']:') + (' ' + logData.message + '\n');
      switch (logData.level) {
        case log.levels.info:
          return writeStreams.out.write(message);
        case log.levels.warning:
          return writeStreams.error.write(message);
        case log.levels.error:
          return writeStreams.error.write(message);
        default:
          return writeStreams.error.write(message);
      }
    };
  }).subscribe(function handleLogSubscribe(produceLog) {
    produceLog();
  });
}

module.exports = {
  create: create,
  writeStreamsFactory: defaultWriteStreamsFactory
};