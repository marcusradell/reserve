function create(actions, events) {
  events.write$.subscribe(function onWrite() {
    actions.setValue('')
  })
}

export default {
  create
}
