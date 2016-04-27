'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _actions = require('./interactions/actions');

var _actions2 = _interopRequireDefault(_actions);

var _events = require('./interactions/events');

var _events2 = _interopRequireDefault(_events);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Make a pattern for excluding/including renderer. -MANI

function create() {
  var events = _events2.default.create(_rxjs2.default);
  var actions = _actions2.default.create(events);
  var renderer = _renderer2.default.create(_react2.default, actions);
  var state = _state2.default.create(_rxjs2.default, events);
  return {
    actions: actions,
    events: events,
    renderer: renderer,
    state: state
  };
}

exports.default = {
  create: create
};