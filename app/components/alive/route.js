function showAliveStatus(requestData) {
  requestData.res.
}

function init(request$) {
  request$.filter('/').subscribe(showAliveStatus)
}

module.exports = {
  init
}
