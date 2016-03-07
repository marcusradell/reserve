const developmentConfigFactory = require('./development')
const environmentConfigFactory = require('./environment')
const PREFIX = 'RSRV_'

function create() {
  /* eslint-disable no-console */
  console.log(
    `Config read with NODE_ENV: [${process.env.NODE_ENV}]`
  )
  /* eslint-enable no-console */
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
