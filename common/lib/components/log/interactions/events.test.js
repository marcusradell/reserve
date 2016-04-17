'use strict';

// TODO: redo in ES6. -MANI
var tests = require('tap');
var Rx = require('rxjs');
var eventsFactory = require('./events');

tests.test('events', function handleUnitTest(test) {
  var events = eventsFactory.create(Rx);
  test.deepEquals(Object.keys(events), ['add$'], 'should be an object with only the key "add$".');
  test.strictEquals(events.add$.constructor, Rx.Subject, 'should have a key "add$" where value has a Subject constructor.');
  test.done();
});