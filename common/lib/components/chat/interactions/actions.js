"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(events, inputActions) {
  function write() {
    events.write$.next();
  }

  return {
    write: write,
    setValue: inputActions.setValue
  };
}

exports.default = {
  create: create
};