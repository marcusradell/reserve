require('dotenv').config();
const tap = require('tap')
const http = require('http')
const serverCreate = require('./server')

tap.test('server', function handleTape(test) {
  const plannedTests = 1
  test.plan(plannedTests)

  return serverCreate.create()
  .then(function handleCreateThen(serverData) {
    const expected = 'Hello World!'

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
          test.strictEqual(data.toString(), expected)
          resolve()
        })
      })
    })
  })
})
