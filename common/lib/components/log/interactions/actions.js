"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(events, levels) {
  function info(data) {
    events.info$.next({
      level: levels.info,
      group: data.group,
      message: data.message
    });
  }

  function warning(data) {
    events.warning$.next({
      level: levels.warning,
      group: data.group,
      message: data.message
    });
  }

  function error(data) {
    events.error$.next({
      level: levels.error,
      group: data.group,
      message: data.message
    });
  }

  return {
    info: info,
    warning: warning,
    error: error
  };
}

exports.default = {
  create: create
};