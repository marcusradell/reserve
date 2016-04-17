function create(React, actions) {
  function onChange(data) {
    actions.setValue(data)
  }

  function render({state}) {
    return (
      <span>
        <input
          type="text"
          onChange={(domEvent) => onChange(domEvent.target.value)}
          value={ state.value }
          />
      </span>
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
