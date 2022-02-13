#! /usr/bin/env node
const { mainModule } = require('process')
const fs = require('fs'),
  path = require('path'),
  process = require('process'),
  jsyaml = require('js-yaml'),
  axios = require('axios')

function validateCli() {
  if (process.argv.length < 3) {
    console.log(`Usage: npx mastermind <git repo>`)
  }
}

function getTokenFromDotFile() {
  const FullPath = process.env.HOME + '/.mastermind'
  console.log(`FullPath: ${FullPath}`)
  if (fs.existsSync(FullPath)) {
    const lines = fs.readFileSync(FullPath, 'utf8').split('\n')
    const FileVars = lines.reduce((final, line) => {
      const matches = line.match(/^(.+?)=(.+)$/)
      if (matches) {
        final[matches[1]] = matches[2]
      }
      return final
    }, {})

    if ('token_github' in FileVars) {
      return FileVars.token_github
    }
  } else {
    throw new Error('Missing API token')
  }
}

function validateConfig(sites) {
  if (!('webserver' in sites)) {
    throw new Error('Missing webserver')
  }
  if (!('path' in sites.webserver)) {
    throw new Error('Missing webserver.path')
  }

}

async function main() {
  const GITHUB_FILE_PATH = process.argv[2]
  console.log(`File: ${GITHUB_FILE_PATH}`)
  try {
    const GITHUB_TOKEN = process.argv.length > 3 ? process.argv[3] : getTokenFromDotFile()
    const resp = await axios.get(GITHUB_FILE_PATH, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
        Authorization: `token ${GITHUB_TOKEN}`,
      }
    })
    const VirtualSites = jsyaml.load(resp.data)

    validateConfig(VirtualSites)
    console.log(VirtualSites)
  } catch (err) {
    console.error(err.message)
  }
}

validateCli()
main()