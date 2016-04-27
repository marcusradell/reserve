'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _raven = require('raven');

var _raven2 = _interopRequireDefault(_raven);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(ravenConnectionString) {
  var client = new _raven2.default.Client(ravenConnectionString);
  // TODO: Make an unpatcher wrapped in a return destroy function. -MANI
  client.patchGlobal();

  function info() {}

  function warning() {}

  function error(err) {
    client.captureException(err);
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