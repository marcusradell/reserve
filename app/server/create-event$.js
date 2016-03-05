const user = require('../components/user')

function createEvent$() {
  return user.events.event$
}

module.exports = {
  createEvent$
}
