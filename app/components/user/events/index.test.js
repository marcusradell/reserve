const rootTest = require('tap').test
const user = require('../../user')

rootTest('user', function handleTape(test) {
  return new Promise(function handlePromiseLogin(resolve) {
    const disposer = user.events.login$.subscribe(
      function handleStateSubscribe(loginData) {
        disposer.dispose()
        test.strictEquals(
          loginData.name,
          'Marcus Nielsen',
          'should login user with name Marcus Nielsen'
        )
        resolve()
      }
    )
    user.events.login('Marcus Nielsen')
  })
  .then(function handleThenRename() {
    return new Promise(function handlePromiseLogin(resolve) {
      const disposer = user.events.rename$.subscribe(
        function handleSubscribe(renameData) {
          disposer.dispose()
          test.deepEquals(
            renameData,
            {
              oldName: 'Marcus Nielsen',
              newName: 'Marcus Rådell'
            },
            'should rename from "Marcus Nielsen" to "Marcus Rådell"'
          )
          resolve()
        }
      )
      user.events.rename('Marcus Nielsen', 'Marcus Rådell')
    })
  })
  .then(function handleThenLogout() {
    return new Promise(function handlePromiseLogout(resolve) {
      const disposer = user.events.logout$.subscribe(
        function handleSubscribe(logoutData) {
          disposer.dispose()
          test.strictEquals(
            logoutData.name,
            'Marcus Rådell',
            'should logout user with name Marcus Rådell'
          )
          resolve()
        }
      )
      user.events.logout('Marcus Rådell')
    })
  })
})
