require('../config')
const rootTest = require('tap').test
const http = require('http')
const serverCreate = require('../server')
const Rx = require('rx')

rootTest('server', function handleTape(test) {
  return serverCreate.create()
  .then(function handleCreateThen(serverData) {
    const options = {
      port: process.env.PORT,
      hostname: process.env.HOST,
      method: 'GET',
      path: '/v1/hello'
    };

    const req = http.request(options)
    req.end(function handleRequestEnd() {
      serverData.close()
    })

    return new Promise(function handleResponsePromise(resolve) {
      Rx.Observable.fromEvent(req, 'response')
      .flatMap(function handleFlatMap(response) {
        return Rx.Observable.fromEvent(response, 'data')
      }).subscribe(function handleResponseData(data) {
        const expected = {text: 'Hello World!'}
        const actual = JSON.parse(data.toString())

        test.strictDeepEqual(
          actual, expected,
          'response should return correct text'
        )

        resolve()
      })
    })
  })
})
