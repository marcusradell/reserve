"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function create(Rx, event$Array) {
  var _Rx$Observable;

  return {
    event$: (_Rx$Observable = Rx.Observable).merge.apply(_Rx$Observable, _toConsumableArray(event$Array))
  };
}

exports.default = {
  create: create
};