function create(React, ReactDom, state$, {ConnectionElement, ClientChatElement, ServerChatElement}) {
  state$
  .map(function onMap(state) {
    return (
      <div>
        <strong>Websocket server status</strong>
        <ConnectionElement state={state.connection} />
        <strong>Client state</strong>
        <ClientChatElement state={state.clientChat}/>
        <strong>Server state</strong>
        <ServerChatElement state={state.serverChat}/>
      </div>
    )
  })
  .subscribe((app) => {
    ReactDom.render(app, document.querySelector('[data-app]'))
  })
}

export default {
  create
}
