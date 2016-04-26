import serverFactory from './server'

/**
Entry point for the application and thus selfexecuting.
Called by npm start script
@returns {null} Returns null.
*/
function create() {
  serverFactory.create()
}

create()
