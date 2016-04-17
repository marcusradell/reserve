"use strict";

function create() {
  return {
    out: process.stdout,
    error: process.stderr
  };
}

module.exports = {
  create: create
};