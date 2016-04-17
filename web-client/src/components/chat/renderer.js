function create(React, actions, inputRenderer) {
  const Input = inputRenderer.render

  function onClick() {
    actions.write()
  }

  function render({state}) {
    return (
      <div>
        <div>
          <Input state={state.input}/>
          <button onClick={onClick}>
            send
          </button>
        </div>
        <div>
          {
            state.messages.map(function onMap(message, index) {
              return (
                <div key={index}>{message}</div>
              )
            })
          }
        </div>
      </div>
    )
  }

  render.propTypes = {
    state: React.PropTypes.object.isRequired
  }

  return {
    render
  }
}

export default {
  create
}
