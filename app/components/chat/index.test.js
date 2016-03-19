const tests = require('tap');
const chatFactory = require('./index')

tests.test('write', function handleTest(test) {
  const chat = chatFactory.create()
  const subscription = chat.events.write$.subscribe(
    function handleSubscribe(data) {
      subscription.unsubscribe()
      test.deepEquals(
        data,
        {val: 'a'},
        'should have action write that triggers event write$ with given data.'
      )
      test.done()
    }
  )
  chat.actions.write({
    val: 'a'
  })
})
