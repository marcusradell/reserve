/* eslint-disable no-console */
console.log(
  `Config read with NODE_ENV: [${process.env.NODE_ENV}]`
)
/* eslint-enable no-console */

const localDevelopment = {
  PORT: '3000',
  HOST: '0.0.0.0',
  LOG_MOCKED_DB: 'false',
  LOG_LEVELS: 'info, warning, error',
  LOG_GROUPS: ''
}

const config = process.env.NODE_ENV === 'development' ? localDevelopment : {}

Object.keys(config).forEach(function handleConfigMap(key) {
  process.env[key] = config[key]
})
