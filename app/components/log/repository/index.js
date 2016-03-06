// Fakes an underlying database in-memory. -MANI

const Rx = require('rx')
const events = require('../events')
const stateSubject = new Rx.Subject()
const DB_STATE_LOG_DEBOUNCE_MS = 200
const JSON_INDENTS = 2

function loadDatabaseState() {
  return []
}

events.add$
.timestamp()
.subscribe(function handleAddSubscribe(timeStampedLogData) {
  stateSubject.onNext(function addEventHandler(currentDatabaseState) {
    // TODO: Make pure functional. -MANI
    currentDatabaseState.push(timeStampedLogData)
    return currentDatabaseState
  })
})

const state$ = stateSubject
.startWith(loadDatabaseState())
.scan(function handleStateScan(currentDatabaseState, handleEvent) {
  return handleEvent(currentDatabaseState)
})

state$
.debounce(DB_STATE_LOG_DEBOUNCE_MS)
.subscribe(function handleStateSubscribe(logDataCollection) {
  if (process.env.APP_LOG_MOCKED_DB !== 'true') {
    return;
  }
  /* eslint-disable no-console */
  console.log('\n* Mocked database state start *')
  console.log(JSON.stringify(logDataCollection, null, JSON_INDENTS))
  console.log('* Mocked database state end *\n')
  /* eslint-enable no-console */
})
