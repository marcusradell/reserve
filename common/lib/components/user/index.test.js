'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _user = require('../user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ava2.default.cb('user', function handleUnitTest(unitTest) {
  var user = _user2.default.create('user');
  var subscription = user.events.login$.subscribe(function handleStateSubscribe(loginData) {
    subscription.unsubscribe();
    unitTest.is(loginData.name, 'Marcus Nielsen', 'should login user with name Marcus Nielsen');
    unitTest.end();
  });
  user.actions.login({ name: 'Marcus Nielsen' });
});

_ava2.default.cb('rename', function handleUnitTest(unitTest) {
  var user = _user2.default.create();
  var subscription = user.events.rename$.subscribe(function handleSubscribe(renameData) {
    subscription.unsubscribe();
    unitTest.deepEqual(renameData, {
      oldName: 'Marcus Nielsen',
      newName: 'Marcus Rådell'
    }, 'should rename from "Marcus Nielsen" to "Marcus Rådell"');
    unitTest.end();
  });
  user.actions.rename({ oldName: 'Marcus Nielsen', newName: 'Marcus Rådell' });
});

_ava2.default.cb('logout', function handleUnitTest(unitTest) {
  var user = _user2.default.create();
  var subscription = user.events.logout$.subscribe(function handleSubscribe(logoutData) {
    subscription.unsubscribe();
    unitTest.is(logoutData.name, 'Marcus Rådell', 'should logout user with name Marcus Rådell');
    unitTest.end();
  });
  user.actions.logout({ name: 'Marcus Rådell' });
});