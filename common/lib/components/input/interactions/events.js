"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(Rx) {
  var setValue$ = new Rx.Subject();
  return {
    setValue$: setValue$
  };
}

exports.default = {
  create: create
};