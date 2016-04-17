'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _eventsComposer = require('../helpers/eventsComposer');

var _eventsComposer2 = _interopRequireDefault(_eventsComposer);

var _groups = require('./groups');

var _groups2 = _interopRequireDefault(_groups);

var _levels = require('./levels');

var _levels2 = _interopRequireDefault(_levels);

var _events = require('./interactions/events');

var _events2 = _interopRequireDefault(_events);

var _actions = require('./interactions/actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create() {
  var events = _events2.default.create(_rxjs2.default);
  var actions = _actions2.default.create(events, _levels2.default);
  return {
    events: events,
    actions: actions,
    groups: _groups2.default
  };
}

exports.default = {
  create: create
};