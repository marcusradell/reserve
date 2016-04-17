function create(Rx, connectionState$, chatState$) {
  return Rx.Observable.combineLatest(
    connectionState$,
    chatState$,
    function onCombineLatest(connection, chat) {
      return {
        connection,
        chat
      }
    }
  )
}

export default {
  create
}
