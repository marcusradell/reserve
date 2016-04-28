'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function closeCreate(server, log) {
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

function create(config, log) {
  var server = _http2.default.createServer();
  return new Promise(function handleCreatePromise(resolve) {
    server.listen(config.PORT, config.HOST, function handleServerListen() {
      log.actions.info({
        group: log.groups.httpServer,
        message: 'Listening on ' + ('[' + server.address().address + ':') + (server.address().port + ']')
      });
      resolve({
        close: closeCreate(server, log),
        server: server
      });
    });
  });
}

exports.default = {
  create: create
};