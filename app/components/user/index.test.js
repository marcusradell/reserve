const rootTest = require('tap').test
const user = require('../user')

rootTest('user', function handleTape(test) {
  return new Promise(function handlePromise(resolve) {
    const SKIP_INITIAL_VALUE = 1
    // TODO: Get last item directly instead of skipping to second item. -MANI
    const lastItem$ = user.repository.state$.skip(SKIP_INITIAL_VALUE)
    lastItem$.subscribe(
      function handleStateSubscribe(userDataCollection) {
        const FIRST_USER = 0
        test.strictEquals(userDataCollection[FIRST_USER].name, 'Marcus Nielsen')
        resolve()
      }
    )
    user.events.login('Marcus Nielsen')
  })
})
