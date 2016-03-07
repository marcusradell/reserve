// TODO: #scan() over the event$ and include
// a hash of the previous event data and hash. -MANI

function create(userModule) {
  return function createEvent$() {
    return userModule.events.event$
  }
}

module.exports = {
  create
}
