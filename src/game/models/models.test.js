import {
  when,
  is,
  uniq,
  pipe,
  values,
  flatten,
  prop,
  omit,
  map,
} from 'ramda'

import models from './index'


function findAll (needle, haysack) {
  models[haysack].all.map(hay =>
    hay[needle].map(e =>
      models[needle].find(e.id)))
}

function findAllPlain (needle, haysack) {
  models[haysack].all.map(hay =>
    hay[needle].map(e =>
      models[needle].find(e)))
}

function equipsOnMonsters () {
  const getId = when(is(Object), prop('id'))
  const getEquipPrizes = pipe(prop('prizes'), omit(['exp', 'items']), values)

  map(prize => models.equips.find(prize),
    uniq(flatten(models.monsters.all.map(getEquipPrizes)).map(getId)),
  )
}

test('models', () => {
  findAll('monsters', 'maps')
  findAll('skills', 'stances')
  findAllPlain('stances', 'classes')
  equipsOnMonsters()
})
