if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic')
}

import Promise from 'bluebird'

import engine from './engine'
import game from './game'

Promise.config({
  warnings: true,
  longStackTraces: true,
  cancellation: true,
  monitoring: true,
})

function handleError (error) {
  console.error('Engine exploded')
  console.error(error.message)
  console.error(error.stack)
}

Promise.resolve()
  .then(game.start)
  .then(engine.start)
  .then(() => console.log('Engine started'))
  .catch(handleError)

