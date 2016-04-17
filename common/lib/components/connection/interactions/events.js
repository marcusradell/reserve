"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(Rx) {
  var connect$ = new Rx.Subject();
  var disconnect$ = new Rx.Subject();
  return {
    connect$: connect$,
    disconnect$: disconnect$
  };
}

exports.default = {
  create: create
};