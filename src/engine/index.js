import Promise from 'bluebird'

import {
  prop,
  mapObjIndexed,
} from 'ramda'

import providers from './providers'

function startAdapter (adapter, name) {
  const provider = prop(name, providers)

  if (provider) {
    return provider.start()
      .then(adapter)
  }

  return Promise.reject(new Error(`No provider named ${name}`))
}

function start (app) {
  return Promise.props(mapObjIndexed(startAdapter, app.adapters))
}

export default {
  start,
}
