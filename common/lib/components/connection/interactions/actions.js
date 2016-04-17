"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(events) {
  function connect() {
    events.connect$.next();
  }

  function disconnect() {
    events.disconnect$.next();
  }

  return {
    connect: connect,
    disconnect: disconnect
  };
}

exports.default = {
  create: create
};