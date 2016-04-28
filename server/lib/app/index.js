'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _chat = require('reserve-common/lib/components/chat');

var _chat2 = _interopRequireDefault(_chat);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _events = require('./interactions/events');

var _events2 = _interopRequireDefault(_events);

var _httpServer = require('../http-server');

var _httpServer2 = _interopRequireDefault(_httpServer);

var _serverLog = require('../server-log');

var _serverLog2 = _interopRequireDefault(_serverLog);

var _user = require('reserve-common/lib/components/user');

var _user2 = _interopRequireDefault(_user);

var _websocketServer = require('../websocket-server');

var _websocketServer2 = _interopRequireDefault(_websocketServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Fix too many statements eslint error. -MANI
/* eslint-disable max-statements */
// TODO: Rename parent folder to app. -MANI
function create() {
  var config = _config2.default.create();
  var log = _serverLog2.default.create(config);
  var serverDataPromise = _httpServer2.default.create(config, log);
  var userNamespace = 'user';
  var chatNamespace = 'chat';
  var user = _user2.default.create(userNamespace);
  var chat = _chat2.default.create(chatNamespace);
  var actions = {};
  actions[userNamespace] = user.actions;
  actions[chatNamespace] = chat.actions;
  var events = _events2.default.create(_rxjs2.default, [user.events.event$, chat.events.event$]);
  log.actions.info({
    group: log.groups.httpServer,
    message: 'Server starting with NODE_ENV: [' + process.env.NODE_ENV + ']'
  });
  var JSON_SPACING = 2;
  log.actions.info({
    group: log.groups.httpServer,
    message: 'Config loaded with keys: \n' + 'CONFIG START\n' + ('' + JSON.stringify(Object.keys(config), null, JSON_SPACING)) + '\nCONFIG END'
  });
  events.event$.subscribe(function logEvent(eventData) {
    log.actions.info({
      group: log.groups.event,
      message: JSON.stringify(eventData, null, JSON_SPACING)
    });
  });
  return serverDataPromise.then(function onThen(serverData) {
    _websocketServer2.default.create(serverData.server, {
      events: events,
      actions: actions
    }, log);
    return serverData;
  }).then(function onThenReturnServerData(serverData) {
    return serverData;
  });
}
/* eslint-enable max-statements */

exports.default = {
  create: create
};