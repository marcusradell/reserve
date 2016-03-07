// TODO: Should .gitignore this file
// and put content in development.template.js -MANI
// Also, then, add support for missing that file. -MANI

function create() {
  return {
    PORT: '3000',
    HOST: '0.0.0.0',
    LOG_MOCKED_DB: 'false',
    LOG_LEVELS: 'info, warning, error',
    LOG_GROUPS: ''
  }
}

module.exports = {
  create
}
