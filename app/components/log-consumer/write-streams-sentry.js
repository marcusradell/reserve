const raven = require('raven');

function create(ravenConnectionString) {
  const client = new raven.Client(ravenConnectionString);
  // TODO: Make an unpatcher wrapped in a return destroy function. -MANI
  client.patchGlobal();
  function write(message) {
    client.captureException(new Error(message))
  }
  return {
    out: {
      write
    },
    error: {
      write
    }
  }
}

module.exports = {
  create
}
