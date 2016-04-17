'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // TODO: Remove duplicate code (original in backend). -MANI


function create(events, namespace) {
  var _Rx$Observable;

  var eventKeys = Object.keys(events);
  var eventsArray = eventKeys.map(function handleEventKeyMap(eventKey) {
    return events[eventKey].map(function handleEvent$Map(actionData) {
      return {
        header: {
          namespace: namespace,
          eventName: eventKey
        },
        body: actionData
      };
    });
  });
  var event$ = (_Rx$Observable = _rxjs2.default.Observable).merge.apply(_Rx$Observable, _toConsumableArray(eventsArray));
  return Object.assign({}, events, { event$: event$ });
}

exports.default = {
  create: create
};