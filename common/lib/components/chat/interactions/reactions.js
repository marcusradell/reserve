'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function create(actions, events) {
  events.write$.subscribe(function onWrite() {
    actions.setValue('');
  });
}

exports.default = {
  create: create
};