function create(Rx, connectionState$, clientChatState$, serverChatState$) {
  return Rx.Observable.combineLatest(
    connectionState$,
    clientChatState$,
    serverChatState$,
    function onCombineLatest(connection, clientChat, serverChat) {
      return {
        connection,
        clientChat,
        serverChat
      }
    }
  )
}

export default {
  create
}
