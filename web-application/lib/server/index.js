'use strict';

// TODO: Make whole project ES6 style or node v6 if it supports modules. -MANI
var http = require('http');
var SocketIo = require('socket.io');
var Rx = require('rxjs');
var logFactory = require('reserve-common/lib/components/log').default;
var userFactory = require('reserve-common/lib/components/user').default;
var chatFactory = require('reserve-common/lib/components/chat').default;
var logConsumerFactory = require('reserve-common/lib/components/log-consumer').default;
var socketConnectionFactory = require('./socket-connection');
var configFactory = require('../config');
var eventsFactory = require('./interactions/events');
var sentryWritersFactory = require('reserve-common/lib/components/log-consumer/writers/sentry-writers').default;
var stdWritersFactory = require('reserve-common/lib/components/log-consumer/writers/sentry-writers').default;

function closeFactory(server, log) {
  return function close() {
    return new Promise(function handleDestroyPromise(resolveClose) {
      server.close(function handleClose() {
        log.actions.add({
          level: log.levels.info,
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
      log.actions.add({
        level: log.levels.info,
        group: log.groups.httpServer,
        message: 'Listening on ' + ('[' + serverData.httpServer.address().address + ':') + (serverData.httpServer.address().port + ']')
      });
      resolve();
    });
  });
}

function createSetupIoServerFn(httpServer, interactions, log) {
  return function handleThenSetupIoServer() {
    var ioServer = SocketIo.listen(httpServer);
    ioServer.on('connection', socketConnectionFactory.create(interactions, log));
  };
}

// TODO: Fix too many statements eslint error. -MANI
/* eslint-disable max-statements */
function create() {
  var log = logFactory.create();
  var config = configFactory.create();
  var httpServer = http.createServer();
  var userNamespace = 'user';
  var chatNamespace = 'chat';
  var user = userFactory.create(userNamespace);
  var chat = chatFactory.create(chatNamespace);
  var actions = {};
  actions[userNamespace] = user.actions;
  actions[chatNamespace] = chat.actions;
  var events = eventsFactory.create(Rx, [user.events.event$, chat.events.event$]);
  logConsumerFactory.create(log, stdWritersFactory.create(), {
    groupsFilter: config.LOG_GROUPS
  });
  if (config.SENTRY) {
    logConsumerFactory.create(log, sentryWritersFactory.create(config.SENTRY), {
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

module.exports = {
  create: create
};