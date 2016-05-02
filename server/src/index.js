import appFactory from './app'

/**
Entry point for the application and thus selfexecuting.
Called by npm start script
@returns {null} Returns null.
*/
function create() {
  appFactory.create()
}

create()
