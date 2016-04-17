'use strict';

// TODO: redo in ES6. -MANI
var tests = require('tap');
var Rx = require('rxjs');
var eventsFactory = require('./events');
var actionsFactory = require('./actions');

tests.test('actions', function handleTests(test) {
  var events = eventsFactory.create(Rx);
  events.add$.subscribe(function handleSubscribe(addData) {
    test.deepEquals(addData, {
      level: 'l',
      group: 'g',
      message: 'm'
    }, 'should send eventData to the add$ event when add action is called.');
    test.done();
  });
  var actions = actionsFactory.create(events);
  actions.add({
    level: 'l',
    group: 'g',
    message: 'm'
  });
});

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