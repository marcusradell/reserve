"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(Rx, events, inputState) {
  var messageStateSubject = new Rx.Subject();
  var initialState = [];

  events.write$.withLatestFrom(inputState.state$, function onWithLatestFrom(_undefinedData, inputStateData) {
    return inputStateData;
  }).subscribe(function onWrite(messageData) {
    messageStateSubject.next(function onStateChange(state) {
      return state.concat(messageData.value);
    });
  });

  var messageState$ = messageStateSubject.startWith(initialState).scan(function onScan(currentState, stateChanger) {
    return stateChanger(currentState);
  });

  var state$ = Rx.Observable.combineLatest(messageState$, inputState.state$, function onCombineLatest(messageStateData, inputStateData) {
    return {
      messages: messageStateData,
      input: inputStateData
    };
  });

  return {
    state$: state$
  };
}

exports.default = {
  create: create
};