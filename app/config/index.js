/** @module config */

const developmentConfigFactory = require('./development')
const environmentConfigFactory = require('./environment')

/**
Use this prefix for all environment variables.
@example process.env.RSRV_PORT
*/
const PREFIX = 'RSRV_'

/**
* The configuration factory.
* It uses the environment configuration as base for the config object.
* If NODE_ENV === 'development,
* then the development config will override the environment config'.
* @see module:config/development
* @see module:config/environment
* @returns {Object} The config object.
*/
function create() {
  const environmentConfig = environmentConfigFactory.create(
    process.env, PREFIX
  )
  if (process.env.NODE_ENV === 'development') {
    return Object.assign(
      {}, environmentConfig, developmentConfigFactory.create()
    )
  }
  return Object.assign({}, environmentConfig)
}

module.exports = {
  create,
  PREFIX
}
