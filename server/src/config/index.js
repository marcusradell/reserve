/** @module config */
// TODO: Remove levels. Not used any more. -MANI
import environmentConfigFactory from './environment'

/**
Use this prefix for all environment variables.
@example process.env.RSRV_PORT
*/
const prefixRsrv = 'RSRV_'

/**
* The configuration factory.
* It uses the environment configuration as base for the config object.
* @see module:config/environment
* @returns {Object} The config object.
*/
function create(prefix) {
  const environmentConfig = environmentConfigFactory.create(
    process.env, prefix
  )
  return Object.assign({}, environmentConfig)
}

export default {
  create,
  prefixRsrv
}
