const path = require('path')
const responseCodes = require('../constants/response-codes')
const responseHeaders = require('../constants/response-headers')
const Rx = require('rx')

function init(baseUrl, request$) {
  request$.subscribe(function handleAllSubscribe(data) {
    /* eslint-disable no-console */
    console.log('data.req.url:', data.req.url)
    /* eslint-enable no-console */
  })

  const aliveRoute$ = request$
  .filter(function handleFilter(data) {
    return data.req.url.startsWith(path.join(baseUrl, 'alive'))
  })
  .map(function handleMap() {
    return 'alive'
  })

  const helloRoute$ = request$
  .filter(function handleFilter(data) {
    return data.req.url.startsWith(path.join(baseUrl, 'hello'))
  })
  .map(function handleMap(data) {
    return {res: data.res, message: 'Hello World!'}
  })

  // TODO: Move out routes$ and the subscribe part
  const routes$ = Rx.Observable.merge(aliveRoute$, helloRoute$)
  .subscribe(function handleRoutes(data) {
    const headers = {}
    headers[responseHeaders.contentType] = responseHeaders.applicationJson
    data.res.writeHead(responseCodes.success, headers)
    data.res.end(JSON.stringify({'text': data.message}))
  })
}

module.exports = {
  init
}
