"use strict";

function create(Rx, eventsComposer, namespace) {
  var login$ = new Rx.Subject();
  var rename$ = new Rx.Subject();
  var logout$ = new Rx.Subject();

  return eventsComposer.create({
    login$: login$,
    rename$: rename$,
    logout$: logout$
  }, namespace);
}

module.exports = {
  create: create
};