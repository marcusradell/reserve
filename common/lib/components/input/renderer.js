"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(React, actions) {
  function _onChange(data) {
    actions.setValue(data);
  }

  function render(_ref) {
    var state = _ref.state;

    return React.createElement(
      "span",
      null,
      React.createElement("input", {
        type: "text",
        onChange: function onChange(domEvent) {
          return _onChange(domEvent.target.value);
        },
        value: state.value
      })
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