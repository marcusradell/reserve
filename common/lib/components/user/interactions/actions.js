"use strict";

function create(events) {
  function login(data) {
    events.login$.next(data);
  }

  function rename(data) {
    events.rename$.next(data);
  }

  function logout(data) {
    events.logout$.next(data);
  }

  return {
    login: login,
    rename: rename,
    logout: logout
  };
}

module.exports = {
  create: create
};