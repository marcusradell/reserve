'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
Entry point for the application and thus selfexecuting.
Called by npm start script
@returns {null} Returns null.
*/
function create() {
  _app2.default.create();
}

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
  console.log(err.stack);
});

create();