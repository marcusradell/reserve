"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(Rx) {
  var info$ = new Rx.Subject();
  var warning$ = new Rx.Subject();
  var error$ = new Rx.Subject();
  return {
    info$: info$,
    warning$: warning$,
    error$: error$
  };
}

exports.default = {
  create: create
};