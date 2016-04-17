'use strict';

var raven = require('raven');

function create(ravenConnectionString) {
  var client = new raven.Client(ravenConnectionString);
  // TODO: Make an unpatcher wrapped in a return destroy function. -MANI
  client.patchGlobal();
  function write(message) {
    client.captureException(new Error(message));
  }
  return {
    out: {
      write: write
    },
    error: {
      write: write
    }
  };
}

module.exports = {
  create: create
};