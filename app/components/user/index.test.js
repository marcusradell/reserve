const rootTest = require('tap').test
const user = require('../user')

rootTest('user', function handleTape(test) {
  return new Promise(function handlePromise(resolve) {
    // TODO: Learn about publish and connect and refactor accordingly. -MANI
    const lastItem$ = user.repository.state$.publish()
    lastItem$.connect()
    const disposer = lastItem$.subscribe(
      function handleStateSubscribe(userDataCollection) {
        disposer.dispose()
        const FIRST_USER = 0
        test.strictEquals(
          userDataCollection[FIRST_USER].name,
          'Marcus Nielsen',
          'should login user with name Marcus Nielsen'
        )
        resolve()
      }
    )
    user.events.login('Marcus Nielsen')
  })
  .then(function handleThen() {
    // TODO: Learn about publish and connect and refactor accordingly. -MANI
    const lastItem$ = user.repository.state$.publish()
    lastItem$.connect()
    const disposer = lastItem$.subscribe(
      function handleSubscribe(userDataCollection) {
        disposer.dispose()
        const EMPTY_LENGTH = 0
        test.strictEquals(
          userDataCollection.length,
          EMPTY_LENGTH,
          'should logout user with name Marcus Nielsen'
        )
      }
    )
    user.events.logout('Marcus Nielsen')
  })
})
