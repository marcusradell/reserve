'use strict';

var unitTests = require('tap');
var Rx = require('rxjs');
var eventStreamComposer = require('./index');

unitTests.test('compose', function handleUnitTest(unitTest) {
  var NUMBER_OF_TESTS = 2;
  unitTest.plan(NUMBER_OF_TESTS);

  var event$A = new Rx.Subject();
  var event$B = new Rx.Subject();
  var events = eventStreamComposer.create({
    event$A: event$A,
    event$B: event$B
  }, 'test');
  var eventASubscription = events.event$.subscribe(function handleSubscribe(event$Data) {
    eventASubscription.unsubscribe();
    var expected = {
      header: {
        eventName: 'event$A',
        namespace: 'test'
      },
      body: {
        stuff: 'thing'
      }
    };

    unitTest.deepEquals(event$Data, expected);
  });
  event$A.next({ stuff: 'thing' });

  var eventBSubscription = events.event$.subscribe(function handleSubscribe(event$Data) {
    eventBSubscription.unsubscribe();
    var expected = {
      header: {
        eventName: 'event$A',
        namespace: 'test'
      },
      body: {
        bodaschious: 'bodylicious'
      }
    };

    unitTest.deepEquals(event$Data, expected);
    unitTest.done();
  });
  event$A.next({ bodaschious: 'bodylicious' });
});