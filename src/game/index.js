import {
  partial,
  map,
} from 'ramda'

import adapters from './adapters'
import database from './database'

function build (dao) {
  return {
    adapters: map(adapter => partial(adapter, [dao]), adapters),
  }
}

function start () {
  return database
    .connect()
    .then(build)
    .catch(err => console.error(err))
}

export default {
  start,
}

