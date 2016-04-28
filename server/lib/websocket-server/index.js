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
    console.log('MARK22');
    log.actions.info({
      group: log.groups.wsServer,
      message: 'A client connected.'
    });
    var event$Subscription = interactions.events.event$.subscribe(function handleSubscribe(data) {
      socket.emit('server-event', data);
    });
    socket.on('client-event', function handleMessage(data) {
      try {
        var actionName = data.header.eventName.slice(startIndex, lastIndex);
        interactions.actions[data.header.namespace][actionName](data.body);
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
    console.log('MARK21');
    socketConnectionCreate(interactions, log)(socket);
  });
}

exports.default = {
  create: create
};