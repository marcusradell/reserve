const tests = require('tap')
const Rx = require('rxjs/rx')
const eventsFactory = require('./events')
const actionsFactory = require('./actions')

tests.test('actions', function handleTests(test) {
  const events = eventsFactory.create(Rx)
  events.add$.subscribe(function handleSubscribe(addData) {
    test.deepEquals(
      addData,
      {
        level: 'l',
        group: 'g',
        message: 'm'
      },
      'should send eventData to the add$ event when add action is called.'
    )
    test.done()
  })
  const actions = actionsFactory.create(events)
  actions.add({
    level: 'l',
    group: 'g',
    message: 'm'
  })
})

// function create(Rx, events) {
//
//   function add(data) {
//     events.add$.next({
//       level: data.level,
//       group: data.group,
//       message: data.message
//     })
//   }
//
//   return {
//     add
//   }
// }
//
// module.exports = {
//   create
// }
