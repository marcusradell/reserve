/** @module config/development */

/**
* Creates a default development configuration.
* @returns {Object} The development config object.
*/
function create() {
  return {
    PORT: '3000',
    HOST: '0.0.0.0',
    LOG_LEVELS: 'info, warning, error',
    LOG_GROUPS: ''
  }
}

module.exports = {
  create
}
