require('./config')
const rootTest = require('tap').test
const http = require('http')
const serverCreate = require('./server')

rootTest('server', function handleTape(test) {
  return serverCreate.create()
  .then(function handleCreateThen(serverData) {
    const options = {
      port: process.env.PORT,
      hostname: process.env.HOST,
      method: 'GET',
      path: '/'
    };

    const req = http.request(options)
    req.end(function handleRequestEnd() {
      serverData.close()
    })

    return new Promise(function handleResponsePromise(resolve) {
      req.on('response', function handleOnResponse(response) {
        response.on('data', function handleOnData(data) {
          const expected = 'Hello World!'
          const actual = data.toString()

          test.strictEqual(
            actual, expected,
            'response should return correct text'
          )

          resolve()
        })
      })
    })
  })
})
