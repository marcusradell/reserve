"use strict";

/** @module config/environment */

/**
* Creates the configuration object.
* @param {Object} envVarCollection - Usually the variable `process.env`.
* @param {String} prefix -
* The prefix used on all environment variables as a namespace.
* @returns {Object} The development config object containing
* all the environment variables with given prefix,
* but with the prefix stripped from the returned object's keys.
*/
function create(envVarCollection, prefix) {
  var envVarKeys = Object.keys(envVarCollection);
  var config = {};
  envVarKeys.filter(function handleFilter(envVarKey) {
    return envVarKey.startsWith(prefix);
  }).forEach(function handleMap(envVarKey) {
    config[envVarKey.slice(prefix.length)] = envVarCollection[envVarKey];
  });
  return config;
}

module.exports = {
  create: create
};