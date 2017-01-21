import {
  map,
  toLower,
  partial,
} from 'ramda'

import classes from './classes'
import stances from './stances'

const models = {
  classes,
  stances,
}

function find (model, name) {
  return model
    .find(clas => toLower(clas.name) === toLower(name))
}

function buildModel (model) {
  return {
    find: partial(find, [model]),
    all: model,
  }
}

export default map(buildModel, models)

