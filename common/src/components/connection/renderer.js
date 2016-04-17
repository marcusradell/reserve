function create(React) {
  function render({state}) {
    return (
      <div>
        <div>Connected: {state.isConnected.toString()}</div>
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
