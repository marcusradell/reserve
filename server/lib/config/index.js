'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
Use this prefix for all environment variables.
@example process.env.RSRV_PORT
*/
var PREFIX = 'RSRV_';

/**
* The configuration factory.
* It uses the environment configuration as base for the config object.
* @see module:config/environment
* @returns {Object} The config object.
*/
/** @module config */
// TODO: Remove levels. Not used any more. -MANI
function create() {
  var environmentConfig = _environment2.default.create(process.env, PREFIX);
  return Object.assign({}, environmentConfig);
}

exports.default = {
  create: create,
  PREFIX: PREFIX
};