const rootTest = require('tap').test
const behaviors = require('../behaviors')

rootTest('user behaviors', function handleTape(test) {
  return new Promise(function handlePromiseLogin(resolve) {
    const disposer = behaviors.events.login$.subscribe(
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
    behaviors.actions.login('Marcus Nielsen')
  })
  .then(function handleThenRename() {
    return new Promise(function handlePromiseLogin(resolve) {
      const disposer = behaviors.events.rename$.subscribe(
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
      behaviors.actions.rename('Marcus Nielsen', 'Marcus Rådell')
    })
  })
  .then(function handleThenLogout() {
    return new Promise(function handlePromiseLogout(resolve) {
      const disposer = behaviors.events.logout$.subscribe(
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
      behaviors.actions.logout('Marcus Rådell')
    })
  })
})
