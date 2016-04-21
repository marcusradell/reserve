import unitTests from 'ava'
import userFactory from '../user'

unitTests.cb('user', function handleUnitTest(unitTest) {
  const user = userFactory.create('user')
  const subscription = user.events.login$.subscribe(
    function handleStateSubscribe(loginData) {
      subscription.unsubscribe()
      unitTest.is(
        loginData.name,
        'Marcus Nielsen',
        'should login user with name Marcus Nielsen'
      )
      unitTest.end()
    }
  )
  user.actions.login({name: 'Marcus Nielsen'})
})

unitTests.cb('rename', function handleUnitTest(unitTest) {
  const user = userFactory.create()
  const subscription = user.events.rename$.subscribe(
    function handleSubscribe(renameData) {
      subscription.unsubscribe()
      unitTest.deepEqual(
        renameData,
        {
          oldName: 'Marcus Nielsen',
          newName: 'Marcus Rådell'
        },
        'should rename from "Marcus Nielsen" to "Marcus Rådell"'
      )
      unitTest.end()
    }
  )
  user.actions.rename({oldName: 'Marcus Nielsen', newName: 'Marcus Rådell'})
})

unitTests.cb('logout', function handleUnitTest(unitTest) {
  const user = userFactory.create()
  const subscription = user.events.logout$.subscribe(
    function handleSubscribe(logoutData) {
      subscription.unsubscribe()
      unitTest.is(
        logoutData.name,
        'Marcus Rådell',
        'should logout user with name Marcus Rådell'
      )
      unitTest.end()
    }
  )
  user.actions.logout({name: 'Marcus Rådell'})
})
