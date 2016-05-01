# ReServe
## A Reactive Node server (with frontend and universal/common compnents)

[![Join the chat at https://gitter.im/marcusnielsen/reserve](https://badges.gitter.im/marcusnielsen/reserve.svg)](https://gitter.im/marcusnielsen/reserve?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/marcusnielsen/rxjs-server.svg?branch=master)](https://travis-ci.org/marcusnielsen/rxjs-server)
[![Coverage Status](https://coveralls.io/repos/github/marcusnielsen/rxjs-server/badge.svg?branch=master)](https://coveralls.io/github/marcusnielsen/rxjs-server?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/marcusnielsen/rxjs-server/badges/score.svg)](https://www.bithound.io/github/marcusnielsen/rxjs-server)
[![bitHound Dependencies](https://www.bithound.io/github/marcusnielsen/rxjs-server/badges/dependencies.svg)](https://www.bithound.io/github/marcusnielsen/rxjs-server/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/marcusnielsen/rxjs-server/badges/devDependencies.svg)](https://www.bithound.io/github/marcusnielsen/rxjs-server/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/marcusnielsen/rxjs-server/badges/code.svg)](https://www.bithound.io/github/marcusnielsen/rxjs-server)

(Previously named RxJS Server. Some old usage of that name might ReMain.)
Since the restructure to three projects, I need to re-enable the services. Right now, the chat is up, but CI-services are down for a while longer.

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
See `.docker-env` for needed settings or tests at `app/config/index.test.js`.

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
This project tries to minimize the API surface by not using large frameworks. Tools that can be replaced by a small amount of custom code will not be used for the same reason.

Note:
- Socket.io does not conform to the above rule due to limitations in my understanding of implementing a websocket server from the net module.
- RxJS could be replaced by CSP channels written with generators. Google suggestion: "kyle simpson csp".

All components will export a `create` factory function. This makes testing easier and lessens the side effects of node modules being singletons.

Only the root level files (usually `index.js`) `require` modules. Child modules get them sent in as arguments to the `create` factory function.

Functions that depend on variables in the parent scope should also use a `create` factory function by creating an isolated parent scope.
This makes it easier to reason about what variables are accessed in the parent scope.

# Influences
* Cycle.js with great docs and heavy usage of RxJS is the main source of inspiration.
* Interactions (actions and events) comes from the MVI-pattern Intent part as seen in cycle.js docs.
* Repositories were inspired by Redux, but named after a Microsoft pattern.
* The dependency injection were inspired by angular and Microsoft, although it's not the DI pattern but just simple argument passing.
* File structure were inspired by google's suggestion on AngularJS 1.x file structure.
* Testing tools were inspired by Eric Elliot's blogs.
* Config solution was inspired by the npm package dotenv.

# Contributing
First read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
Then follow the instructions in [CONTRIBUTING.md](CONTRIBUTING.md)

# // TODO:
* Make issues for the todos.
* Complete jsdoc for stable parts.
* Make a client.
* Move server app into a subfolder to make room for more sibling services.
  * Add a rabbitMQ or redis service.
  * Add a graph database (Neo4j).
* Deploy to AWS ESC. Check if it suits with docker-machine deploy.
  * Setup a swarm cluster. https://docs.docker.com/swarm/provision-with-machine/
* Add free CI service. [DONE]
  * Hook it up to github with tests and coverage report.
  * Activate Docker-compose workflow. https://docs.travis-ci.com/user/docker/
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
