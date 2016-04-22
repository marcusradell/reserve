import raven from 'raven'

function create(ravenConnectionString) {
  const client = new raven.Client(ravenConnectionString);
  // TODO: Make an unpatcher wrapped in a return destroy function. -MANI
  client.patchGlobal();

  function info() {}

  function warning() {}

  function error(err) {
    client.captureException(err)
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
