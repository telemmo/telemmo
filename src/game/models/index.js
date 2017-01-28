import {
  map,
  toLower,
  partial,
} from 'ramda'

import classes from './classes'
import stances from './stances'
import skills from './skills'
import equips from './equips'
import monsters from './monsters'
import maps from './maps'

const models = {
  classes,
  stances,
  skills,
  equips,
  monsters,
  maps,
}

function find (model, id) {
  const element = model
    .find(item => toLower(item.id) === toLower(id))

  if (element === undefined) {
    throw new Error(`Cannot find model with id ${id}`)
  }

  return element
}

function buildModel (model) {
  return {
    find: partial(find, [model]),
    all: model,
  }
}

export default map(buildModel, models)

