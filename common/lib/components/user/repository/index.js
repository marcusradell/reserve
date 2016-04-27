"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// TODO: Write tests -MANI

function createLoginHandler(stateSubject) {
  return function handleLogin(loginData) {
    stateSubject.next(function handlenext(currentState) {
      return [].concat(_toConsumableArray(currentState), [loginData]);
    });
  };
}

function createRenameHandler(stateSubject) {
  return function handleRename(renameData) {
    stateSubject.next(function handlenext(currentState) {
      currentState.find(function handleFind(userData) {
        return userData.name === renameData.oldName;
      }).name = renameData.newName;
    });
  };
}

function createLogoutHandler(stateSubject) {
  return function handleLogout(logoutData) {
    stateSubject.next(function logoutEventHandler(currentState) {
      return currentState.filter(function handleFilter(userData) {
        return userData.name !== logoutData.name;
      });
    });
  };
}

function create(Rx, events) {
  var stateSubject = new Rx.Subject();
  events.login$.subscribe(createLoginHandler(stateSubject));
  events.rename$.subscribe(createRenameHandler(stateSubject));
  events.logout$.subscribe(createLogoutHandler(stateSubject));
  var state$ = stateSubject.startWith([]).scan(function handleStateScan(currentState, handleEvent) {
    return handleEvent(currentState);
  });
  return {
    state$: state$
  };
}

module.exports = {
  create: create
};