#! /usr/bin/env node
const process = require('process')

function validateCli() {
  if (process.argv.length < 3) {
    console.log(`Usage: npx mastermind <git repo>`)
  }
}

validateCli()
