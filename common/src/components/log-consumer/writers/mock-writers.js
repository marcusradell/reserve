/*
Hands the message back to the callback instead of putting it in a stream.
*/
function create(callBack) {
  function info(data) {
    callBack(data)
  }

  function warning(data) {
    callBack(data)
  }

  function error(data) {
    callBack(data)
  }

  return {
    info,
    warning,
    error
  }
}

export default {
  create
}
