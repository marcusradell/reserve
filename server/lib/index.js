'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
Entry point for the application and thus selfexecuting.
Called by npm start script
@returns {null} Returns null.
*/
function create() {
  _server2.default.create();
}

create();