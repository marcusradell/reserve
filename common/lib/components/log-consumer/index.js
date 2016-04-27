'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INDEX_OF_NOT_FOUND = -1;

function createWriterWrapped$(event$, writer) {
  return event$.map(function onMap(data) {
    return function handleWriter() {
      writer(data);
    };
  });
}

function createHandleGroupsFilter(groupsFilter) {
  return function handleGroupsFilter(logData) {
    return !groupsFilter || groupsFilter.split(',').indexOf(logData.group) !== INDEX_OF_NOT_FOUND;
  };
}

function create(log, writers, options) {
  var infoWritable$ = createWriterWrapped$(log.events.info$, writers.info);
  var warningWritable$ = createWriterWrapped$(log.events.warning$, writers.warning);
  var errorWritable$ = createWriterWrapped$(log.events.error$, writers.error);
  var subscription = _rxjs2.default.Observable.merge(infoWritable$, warningWritable$, errorWritable$).filter(createHandleGroupsFilter(options.groupsFilter)).subscribe(function onInfo$Subscribe(writerWrapper) {
    writerWrapper();
  });
  return {
    subscription: subscription
  };
}

exports.default = {
  create: create
};