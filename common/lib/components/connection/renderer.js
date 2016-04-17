"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(React) {
  function render(_ref) {
    var state = _ref.state;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        "Connected: ",
        state.isConnected.toString()
      )
    );
  }

  render.propTypes = {
    state: React.PropTypes.object.isRequired
  };

  return {
    render: render
  };
}

exports.default = {
  create: create
};