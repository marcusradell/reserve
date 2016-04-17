"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(Rx, eventsComposer, namespace, inputEvents) {
  var write$ = new Rx.Subject();

  return eventsComposer.create({
    write$: write$,
    setValue$: inputEvents.setValue$
  }, namespace);
}

exports.default = {
  create: create
};