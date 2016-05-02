'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startIndex = 0;
var lastIndex = -1;

function socketConnectionCreate(interactions, log) {
  return function handleConnect(socket) {
    log.actions.info({
      group: log.groups.wsServer,
      message: 'A client connected.'
    });
    var event$Subscription = interactions.events.event$.subscribe(function handleSubscribe(data) {
      socket.emit('server-event', data);
    });
    socket.on('client-event', function handleMessage(data) {
      // TODO: Make universal together with the common helper function and make it the router. -MANI
      try {
        var actionName = data.header.eventName.slice(startIndex, lastIndex);
        var namespace = data.header.namespace.replace('client-', '');
        interactions.actions[namespace][actionName](data.body);
        socket.broadcast.emit('server-event', data);
      } catch (error) {
        log.actions.error({
          group: log.groups.wsServer,
          message: error + '\n          data.header.namespace: ' + data.header.namespace + '\n          data.header.eventName: ' + data.header.eventName + '\n          data.body: ' + data.body
        });
      }
    });
    socket.on('error', function onError(error) {
      log.actions.error({
        group: log.groups.wsServer,
        message: error
      });
    });
    socket.on('disconnect', function handleDisconnect() {
      log.actions.info({
        group: log.groups.wsServer,
        message: 'A client disconnected.'
      });
      event$Subscription.unsubscribe();
    });
  };
}

function create(httpServer, interactions, log) {
  var ioServer = _socket2.default.listen(httpServer);
  ioServer.on('connection', function onServerConnect(socket) {
    socketConnectionCreate(interactions, log)(socket);
  });
}

exports.default = {
  create: create
};