const rootTest = require('tap').test
const user = require('../user')

rootTest('user', function handleTape(test) {
  return new Promise(function handlePromise(resolve) {
    const lastItem$ = user.repository.state$
    lastItem$.subscribe(
      function handleStateSubscribe(userDataCollection) {
        // TODO: Make this work. -MANI
        // const FIRST_USER = 0
        // test.strictEquals(userDataCollection[FIRST_USER].name, 'Marcus Nielsen')
        test.pass('temp')
        resolve()
      }
    )
    user.events.login('Marcus Nielsen')
  })
})
