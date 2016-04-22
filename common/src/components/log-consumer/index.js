import Rx from 'rxjs'

const INDEX_OF_NOT_FOUND = -1

function createWriterWrapped$(event$, writer) {
  return (
    event$
    .map(function onMap(data) {
      return function handleWriter() {
        writer(data)
      }
    })
  )
}

function createHandleGroupsFilter(groupsFilter) {
  return function handleGroupsFilter(logData) {
    return !groupsFilter ||
      groupsFilter
      .split(',')
      .indexOf(logData.group) !== INDEX_OF_NOT_FOUND
  }
}

function create(log, writers, options) {
  const infoWritable$ = createWriterWrapped$(
    log.events.info$, writers.info
  )
  const warningWritable$ = createWriterWrapped$(
    log.events.warning$, writers.warning
  )
  const errorWritable$ = createWriterWrapped$(
    log.events.error$, writers.error
  )
  const subscription = Rx.Observable.merge(
    infoWritable$,
    warningWritable$,
    errorWritable$
  )
  .filter(createHandleGroupsFilter(options.groupsFilter))
  .subscribe(function onInfo$Subscribe(writerWrapper) {
    writerWrapper()
  })
  return {
    subscription
  }
}

export default {
  create
}
