/*
Hands the message back to the callback instead of putting it in a stream.
*/
function create(callBack) {
  function writeOut(message) {
    callBack(message)
  }
  function writeError(message) {
    callBack(message)
  }
  return {
    out: {
      write: writeOut
    },
    error: {
      write: writeError
    }
  }
}

module.exports = {
  create
}
