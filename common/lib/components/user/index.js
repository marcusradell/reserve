'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _actions = require('./interactions/actions');

var _actions2 = _interopRequireDefault(_actions);

var _eventsComposer = require('../../helpers/eventsComposer');

var _eventsComposer2 = _interopRequireDefault(_eventsComposer);

var _events = require('./interactions/events');

var _events2 = _interopRequireDefault(_events);

var _repository = require('./repository');

var _repository2 = _interopRequireDefault(_repository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(namespace) {
  var events = _events2.default.create(_rxjs2.default, _eventsComposer2.default, namespace);
  var actions = _actions2.default.create(events);
  var repository = _repository2.default.create(_rxjs2.default, events);

  return {
    repository: repository,
    actions: actions,
    events: events
  };
}

exports.default = {
  create: create
};