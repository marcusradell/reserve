'use strict';

function create(interactions, log) {
  var startIndex = 0;
  var lastIndex = -1;
  return function handleConnect(socket) {
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
      log.actions.add({
        level: log.levels.info,
        group: log.groups.wsServer,
        message: 'A client disconnected.'
      });
      event$Subscription.unsubscribe();
    });
  };
}

module.exports = {
  create: create
};