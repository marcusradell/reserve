'use strict';

/** @module config */

var environmentConfigFactory = require('./environment');

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
function create() {
  var environmentConfig = environmentConfigFactory.create(process.env, PREFIX);
  return Object.assign({}, environmentConfig);
}

module.exports = {
  create: create,
  PREFIX: PREFIX
};