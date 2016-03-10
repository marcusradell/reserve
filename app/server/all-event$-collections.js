function create(userFactory) {
  const user = userFactory.create()
  return user.events.event$Collection
}

module.exports = {
  create
}
