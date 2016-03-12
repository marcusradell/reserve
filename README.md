# RxJS server
[![Build Status](https://travis-ci.org/marcusnielsen/rxjs-server.svg?branch=master)](https://travis-ci.org/marcusnielsen/rxjs-server)

A websocket server built around RxJS.
The project goal is to make a proof of concept of a well-structured medium-sized micro services cluster.
No frameworks were hurt nor installed during the making of this project.

* Docker will be used to help with infrastructure.
* AWS will be used as the cloud host.
* JSDoc for generating documentation.
* Testing will be done with node-tap.

# Setup
* You should have docker installed. But you can do without.
* If running on non-docker host, set all env vars needed.
* For development, set `NODE_ENV=development` and all env vars get default settings.

# Install
* For docker: `npm run docker:up` .
* Local host: `npm install` .

# Scripts
Since this project is backend only, here's some of the starting points.
* `npm run tw` will run complete test-suite and restart when files change.
* `npm run test:cover` for test coverage.
* `npm run jsdoc` to rebuild the docs.
* `npm run docker:up` for docker-compose setup and run.
* `npm start` will test your config, and then start the app.
* `npm run eslint` will lint your code. You should really use a plugin to your IDE instead.
* `npm run` to list all commands.

# File structure
* `app/`
  * Creates and runs the server.
  * `server/`
  * Sets up the http server, websocket server and sets up the event streams components.
  * `config/`
    * Reads the env vars with the app prefix.
    * If development mode, loads default values.
  * `components/`
    * All the middleware component for the app.
      * `interactions`
        * Contains the atomic actions and event streams. The events object also contains a merged event$Collection object.
      * `repository`
        * Holds the Reduced state. Can be used for initializing a starting value.
  * `helpers/`

# Tests
Unit tests are written inside the unit to make the units atomic.

Only use require on the top level of each module/component as to avoid side-effects between tests.

Contain all dynamic code in factories/#create-functions so code can be unit tested in isolation.

# Design patterns


# Contributing
First read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
Then follow the instructions in [CONTRIBUTING.md](CONTRIBUTING.md)

# // TODO:
* Complete jsdoc for stable parts.
* Make a client.
* Move server app into a subfolder to make room for more sibling services.
  * Add a rabbitMQ or redis service.
  * Add a graph database (Neo4j).
* Deploy to AWS ESC. Check if it suits with docker-machine deploy.
  * Setup a swarm cluster. https://docs.docker.com/swarm/provision-with-machine/
* Add free CI service.
  * Hook it up to github with tests and coverage report.
* Add a github static project page.
* Add CONTRIBUTORS.md .
* Add CODE_OF_CONDUCT.md .
* Add info of livecoding.tv/marcusnielsen .
* Read RxJS docs to understand exactly when data flows from subject to subscriber.
* Add https wss support with openssl.
* Get deepEquals assertion with strict equals. Node-tap seem to use == instead of ===.
* Include a hash of the previous event data to secure badly inserted data.
* Unsubscribe and dispose of assets.
* Fix `./app/**/**/**/**/*.test.js` in test script. Nothing wrong with stars, but enough already!
