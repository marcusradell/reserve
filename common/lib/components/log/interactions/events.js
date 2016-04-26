"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(Rx, eventsComposer, namespace) {
  var info$ = new Rx.Subject();
  var warning$ = new Rx.Subject();
  var error$ = new Rx.Subject();
  return eventsComposer.create({
    info$: info$,
    warning$: warning$,
    error$: error$
  }, namespace);
}

exports.default = {
  create: create
};