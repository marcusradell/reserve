const repository = require('./repository')
const behaviors = require('./behaviors')

module.exports = {
  repository,
  actions: behaviors.actions,
  events: behaviors.events
}
