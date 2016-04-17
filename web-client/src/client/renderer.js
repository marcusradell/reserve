function create(React, ReactDom, state$, {ConnectionElement, ChatElement}) {
  state$
  .map(function onMap(state) {
    return (
      <div>
        <ConnectionElement state={state.connection} />
        <ChatElement state={state.chat}/>
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
