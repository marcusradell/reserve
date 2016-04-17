"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(Rx, events) {
  var stateSubject = new Rx.Subject();
  var initialState = {
    isConnected: false
  };

  events.connect$.subscribe(function onConnect() {
    stateSubject.next(function onStateChange() {
      return {
        isConnected: true
      };
    });
  });

  events.disconnect$.subscribe(function onConnect() {
    stateSubject.next(function onStateChange() {
      return {
        isConnected: false
      };
    });
  });

  var state$ = stateSubject.startWith(initialState).scan(function onScan(currentState, stateChanger) {
    return stateChanger(currentState);
  });
  return {
    state$: state$
  };
}

exports.default = {
  create: create
};