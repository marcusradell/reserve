function create(React, ReactDom, state$, {ConnectionElement, ChatElement}) {
  function initialize() {
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

  return {
    initialize
  }
}

export default {
  create
}
