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

var _eventsComposer = require('../../helpers/eventsComposer');

var _eventsComposer2 = _interopRequireDefault(_eventsComposer);

var _events = require('./interactions/events');

var _events2 = _interopRequireDefault(_events);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(namespace) {
  var input = _input2.default.create();
  var events = _events2.default.create(_rxjs2.default, _eventsComposer2.default, namespace, input.events);
  var actions = _actions2.default.create(events, input.actions);
  var state = _state2.default.create(_rxjs2.default, events, input.state);
  var renderer = _renderer2.default.create(_react2.default, actions, input.renderer);
  return {
    events: events,
    actions: actions,
    state: state,
    renderer: renderer
  };
}

exports.default = {
  create: create
};