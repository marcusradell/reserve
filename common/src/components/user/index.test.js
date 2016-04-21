const unitTests = require('ava')
const userFactory = require('../user')

unitTests('login', function handleUnitTest(unitTest) {
  const user = userFactory.create()
  const subscription = user.events.login$.subscribe(
    function handleStateSubscribe(loginData) {
      subscription.unsubscribe()
      unitTest.strictEquals(
        loginData.name,
        'Marcus Nielsen',
        'should login user with name Marcus Nielsen'
      )
      unitTest.done()
    }
  )
  user.actions.login({name: 'Marcus Nielsen'})
})

unitTests.test('rename', function handleUnitTest(unitTest) {
  const user = userFactory.create()
  const subscription = user.events.rename$.subscribe(
    function handleSubscribe(renameData) {
      subscription.unsubscribe()
      unitTest.deepEquals(
        renameData,
        {
          oldName: 'Marcus Nielsen',
          newName: 'Marcus Rådell'
        },
        'should rename from "Marcus Nielsen" to "Marcus Rådell"'
      )
      unitTest.done()
    }
  )
  user.actions.rename({oldName: 'Marcus Nielsen', newName: 'Marcus Rådell'})
})

unitTests.test('logout', function handleUnitTest(unitTest) {
  const user = userFactory.create()
  const subscription = user.events.logout$.subscribe(
    function handleSubscribe(logoutData) {
      subscription.unsubscribe()
      unitTest.strictEquals(
        logoutData.name,
        'Marcus Rådell',
        'should logout user with name Marcus Rådell'
      )
      unitTest.done()
    }
  )
  user.actions.logout({name: 'Marcus Rådell'})
})
