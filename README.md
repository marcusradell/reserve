# RxJS server
A websocket server built around RxJS.
The project goal is to make a proof of concept of a well-structured medium small project.

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
* `npm run` to list all commands.

# File structure
* `app/`
  * Creates and runs the server.
  * `/server`
  * Sets up the http server, websocket server and sets up the event streams components.
  * `/config`
    * Reads the env vars with the app prefix.
    * If development mode, loads default values.
  * `/components`
    * All the middleware component for the app.

# Tests
Unit tests are written inside the unit to make the units atomic.

Only use require on the top level of each module/component as to avoid side-effects between tests.

Contain all dynamic code in factories/#create-functions so code can be unit tested in isolation.

# Contributions
* Yes, please.

# // TODO:
* Complete the factory #create() pattern.
* Complete jsdoc for stable parts.
* Make a client.
* Add a rabbitMQ or redis service.
* Add a graph database (Neo4j).
* Deploy to AWS ESC.
* Add free CI service.
  * Hook it up to github with tests and coverage report.
* Add a github static project page.
* Add CONTRIBUTORS.md .
* Add CODE_OF_CONDUCT.md .
* Add info of livecoding.tv/marcusnielsen .
* Read RxJS docs to understand exactly when data flows from subject to subscriber.
* Add https wss support with openssl.
* Get deepEquals assertion with strict equals. Node-tap seem to use == instead of ===.
