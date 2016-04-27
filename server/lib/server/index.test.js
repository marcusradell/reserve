'use strict';

require('../config');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ioOptions = {
  transports: ['websocket'],
  'force new connection': true
};

_ava2.default.cb('server', function handleUnitTest(unitTest) {
  _server2.default.create().then(function handleCreateThen(serverData) {
    var config = serverData.config;
    var socketURL = 'http://' + config.HOST + ':' + config.PORT;
    var socket = (0, _socket2.default)(socketURL, ioOptions);
    socket.on('connect', function handleConnect() {
      unitTest.pass('should connect a client.');
      socket.emit('message', {
        header: {
          namespace: 'chat',
          action: 'write'
        },
        body: {
          val: 'text'
        }
      });
      socket.disconnect();
    });
    socket.on('error', function handleData(err) {
      serverData.close();
      throw new Error(err);
    });
    socket.on('disconnect', function handleClose() {
      unitTest.pass('should disconnect a client.');
      serverData.close();
      unitTest.end();
    });
  });
});