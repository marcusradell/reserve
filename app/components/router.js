function init(baseUrl, request$) {
  const aliveRoute$ = request$
  .map(function handleMap() {
    return 'alive'
  })
}

module.exports = {
  init
}
