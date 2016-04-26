'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function logDataToString(data, level) {
  return '\n[' + level + ']' + ('[' + data.group + ']:') + (' ' + data.message + '\n');
}

function create() {
  function info(data) {
    /* eslint-disable no-undef */
    process.stdout.write(logDataToString(data), 'i');
    /* eslint-enable no-undef */
  }

  function warning(data) {
    /* eslint-disable no-undef */
    process.stderr.write(logDataToString(data), 'w');
    /* eslint-enable no-undef */
  }

  function error(data) {
    /* eslint-disable no-undef */
    process.stderr.write(logDataToString(data), 'e');
    /* eslint-enable no-undef */
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