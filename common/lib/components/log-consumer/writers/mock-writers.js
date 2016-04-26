"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
Hands the message back to the callback instead of putting it in a stream.
*/
function create(callBack) {
  function info(data) {
    callBack(data);
  }

  function warning(data) {
    callBack(data);
  }

  function error(data) {
    callBack(data);
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