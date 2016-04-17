'use strict';

var Rx = require('rxjs');
var eventStreamComposer = require('../../helpers/eventsComposer');
var eventsFactory = require('./interactions/events');
var actionsFactory = require('./interactions/actions');
var repositoryFactory = require('./repository');

function create(namespace) {
  var events = eventsFactory.create(Rx, eventStreamComposer, namespace);
  var actions = actionsFactory.create(events);
  var repository = repositoryFactory.create(Rx, events);

  return {
    repository: repository,
    actions: actions,
    events: events
  };
}

module.exports = {
  create: create
};