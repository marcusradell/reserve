const unitTests = require('tap')
const userFactory = require('../user')

unitTests.test('login', function handleUnitTest(unitTest) {
  const user = userFactory.create()
  const disposer = user.events.login$.subscribe(
    function handleStateSubscribe(loginData) {
      disposer.dispose()
      unitTest.strictEquals(
        loginData.name,
        'Marcus Nielsen',
        'should login user with name Marcus Nielsen'
      )
      unitTest.done()
    }
  )
  user.actions.login('Marcus Nielsen')
})

unitTests.test('rename', function handleUnitTest(unitTest) {
  const user = userFactory.create()
  const disposer = user.events.rename$.subscribe(
    function handleSubscribe(renameData) {
      disposer.dispose()
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
  user.actions.rename('Marcus Nielsen', 'Marcus Rådell')
})

unitTests.test('logout', function handleUnitTest(unitTest) {
  const user = userFactory.create()
  const disposer = user.events.logout$.subscribe(
    function handleSubscribe(logoutData) {
      disposer.dispose()
      unitTest.strictEquals(
        logoutData.name,
        'Marcus Rådell',
        'should logout user with name Marcus Rådell'
      )
      unitTest.done()
    }
  )
  user.actions.logout('Marcus Rådell')
})
