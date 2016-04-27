'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _chat = require('reserve-common/lib/components/chat');

var _chat2 = _interopRequireDefault(_chat);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _events = require('./interactions/events');

var _events2 = _interopRequireDefault(_events);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _logConsumer = require('reserve-common/lib/components/log-consumer');

var _logConsumer2 = _interopRequireDefault(_logConsumer);

var _log = require('reserve-common/lib/components/log');

var _log2 = _interopRequireDefault(_log);

var _sentryWriters = require('reserve-common/lib/components/log-consumer/writers/sentry-writers');

var _sentryWriters2 = _interopRequireDefault(_sentryWriters);

var _socketConnection = require('./socket-connection');

var _socketConnection2 = _interopRequireDefault(_socketConnection);

var _stdWriters = require('reserve-common/lib/components/log-consumer/writers/std-writers');

var _stdWriters2 = _interopRequireDefault(_stdWriters);

var _user = require('reserve-common/lib/components/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function closeFactory(server, log) {
  return function close() {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        log.actions.info({
          group: log.groups.httpServer,
          message: 'Server closed'
        });
        resolveClose();
      });
    });
  };
}

function httpServerListen(serverData, log) {
  return new Promise(function handleCreatePromise(resolve) {
    serverData.httpServer.listen(serverData.port, serverData.host, function handleServerListen() {
      log.actions.info({
        group: log.groups.httpServer,
        message: 'Listening on ' + ('[' + serverData.httpServer.address().address + ':') + (serverData.httpServer.address().port + ']')
      });
      resolve();
    });
  });
}

function createSetupIoServerFn(httpServer, interactions, log) {
  return function handleThenSetupIoServer() {
    var ioServer = _socket2.default.listen(httpServer);
    ioServer.on('connection', _socketConnection2.default.create(interactions, log));
  };
}

// TODO: Fix too many statements eslint error. -MANI
/* eslint-disable max-statements */
function create() {
  var log = _log2.default.create();
  var config = _config2.default.create();
  var httpServer = _http2.default.createServer();
  var userNamespace = 'user';
  var chatNamespace = 'chat';
  var user = _user2.default.create(userNamespace);
  var chat = _chat2.default.create(chatNamespace);
  var actions = {};
  actions[userNamespace] = user.actions;
  actions[chatNamespace] = chat.actions;
  var events = _events2.default.create(_rxjs2.default, [user.events.event$, chat.events.event$]);
  _logConsumer2.default.create(log, _stdWriters2.default.create(), {
    groupsFilter: config.LOG_GROUPS
  });
  if (config.SENTRY) {
    _logConsumer2.default.create(log, _sentryWriters2.default.create(config.SENTRY), {
      groupsFilter: null
    });
  }
  log.actions.info({
    group: log.groups.httpServer,
    message: 'Server starting with NODE_ENV: [' + process.env.NODE_ENV + ']'
  });
  // TODO: Obfuscate values before logging. -MANI
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
  return httpServerListen({
    httpServer: httpServer,
    port: config.PORT,
    host: config.HOST
  }, log).then(createSetupIoServerFn(httpServer, {
    events: events,
    actions: actions
  }, log)).then(function handleThenReturnServerData() {
    return {
      httpServer: httpServer,
      close: closeFactory(httpServer, log),
      config: config
    };
  });
}
/* eslint-enable max-statements */

exports.default = {
  create: create
};