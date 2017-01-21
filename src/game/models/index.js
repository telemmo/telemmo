import {
  map,
  toLower,
  partial,
} from 'ramda'

import classes from './classes'
import stances from './stances'
import skills from './skills'

const models = {
  classes,
  stances,
  skills,
}

function find (model, name) {
  return model
    .find(item => toLower(item.name) === toLower(name))
}

function buildModel (model) {
  return {
    find: partial(find, [model]),
    all: model,
  }
}

export default map(buildModel, models)

