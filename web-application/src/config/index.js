/** @module config */

import environmentConfigFactory from './environment'

/**
Use this prefix for all environment variables.
@example process.env.RSRV_PORT
*/
const PREFIX = 'RSRV_'

/**
* The configuration factory.
* It uses the environment configuration as base for the config object.
* @see module:config/environment
* @returns {Object} The config object.
*/
function create() {
  const environmentConfig = environmentConfigFactory.create(
    process.env, PREFIX
  )
  return Object.assign({}, environmentConfig)
}

export default {
  create,
  PREFIX
}
