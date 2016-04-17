// TODO: redo in ES6. -MANI
const tests = require('tap')
const Rx = require('rxjs')
const eventsFactory = require('./events')

tests.test('events', function handleUnitTest(test) {
  const events = eventsFactory.create(Rx)
  test.deepEquals(
    Object.keys(events),
    ['add$'],
    'should be an object with only the key "add$".'
  )
  test.strictEquals(
    events.add$.constructor,
    Rx.Subject,
    'should have a key "add$" where value has a Subject constructor.'
  )
  test.done()
})
