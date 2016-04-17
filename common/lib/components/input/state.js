'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(Rx, events) {
  var stateSubject = new Rx.Subject();
  var initialState = {
    value: ''
  };

  events.setValue$.subscribe(function onSetValue$(data) {
    stateSubject.next(function onStateChange(state) {
      state.value = data;
      return state;
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