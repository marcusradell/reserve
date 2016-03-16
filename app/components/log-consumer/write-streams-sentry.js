const raven = require('raven');

function create(ravenConnectionString) {
  const client = new raven.Client(ravenConnectionString);
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
