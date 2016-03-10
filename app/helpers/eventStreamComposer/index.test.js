const unitTests = require('tap')
const Rx = require('rxjs/Rx')
const eventStreamComposer = require('./index')

unitTests.test('compose', function handleUnitTest(unitTest) {
  const NUMBER_OF_TESTS = 2
  unitTest.plan(NUMBER_OF_TESTS)

  const event$A = new Rx.Subject()
  const event$B = new Rx.Subject()
  const event$Collection = eventStreamComposer.create(
    {
      event$A,
      event$B
    },
    'test'
  )
  console.dir(event$Collection[0], 2);
  const eventASubscription = event$Collection
  .subscribe(function handleSubscribe(event$Data) {
    eventASubscription.unsubscribe()
    const expected = {
      header: {
        event$Name: 'event$A',
        namespace: 'test'
      },
      body: {
        stuff: 'thing'
      }
    }

    unitTest.deepEquals(event$Data, expected)
  })
  event$A.next({stuff: 'thing'})

  const eventBSubscription = event$Collection
  .subscribe(function handleSubscribe(event$Data) {
    eventBSubscription.unsubscribe()
    const expected = {
      header: {
        event$Name: 'event$A',
        namespace: 'test'
      },
      body: {
        bodaschious: 'bodylicious'
      }
    }

    unitTest.deepEquals(event$Data, expected)
    unitTest.done()
  })
  event$A.next({bodaschious: 'bodylicious'})
})
