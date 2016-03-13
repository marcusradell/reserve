/*
Hands the message back to the callback instead of putting it in a stream.
*/
function create(callBack) {
  function writeOut(message) {
    callBack(message)
  }
  function writeErr(message) {
    callBack(message)
  }
  return {
    out: {
      write: writeOut
    },
    err: {
      write: writeErr
    }
  }
}

module.exports = {
  create
}
