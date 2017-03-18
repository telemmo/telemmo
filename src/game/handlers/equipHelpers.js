import {
  has,
  values,
  isNil,
  not,
  pipe,
  filter,
  map,
  add,
  prop,
  reduce,
  mergeWith,
} from 'ramda'

import models from '../models'

export function equippedIds (character) {
  return filter(pipe(isNil, not), values(character.equips))
}

export function equipDetails (equipIds) {
  return map(models.equips.find, equipIds)
}

export function mergeEquipBonuses (equips) {
  return reduce(mergeWith(add), {}, values(map(prop('bonus'), equips)))
}

export function formatStatBonus (val) {
  return `${val < 0 ? '-' : '+'}${Math.abs(val)}`
}

export function showBonus (equipBonuses, stat) {
  return has(stat, equipBonuses)
    ? `(${formatStatBonus(prop(stat, equipBonuses))})`
    : ''
}
