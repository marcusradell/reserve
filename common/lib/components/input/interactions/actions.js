"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(events) {
  function setValue(data) {
    events.setValue$.next(data);
  }
  return {
    setValue: setValue
  };
}

exports.default = {
  create: create
};