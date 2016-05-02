"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(React, actions, inputRenderer) {
  var Input = inputRenderer.render;

  function onClick() {
    actions.write();
    actions.setValue();
  }

  function render(_ref) {
    var state = _ref.state;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        React.createElement(Input, { state: state.input }),
        React.createElement(
          "button",
          { onClick: onClick },
          "send"
        )
      ),
      React.createElement(
        "div",
        null,
        state.messages.map(function onMap(message, index) {
          return React.createElement(
            "div",
            { key: index },
            message
          );
        })
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