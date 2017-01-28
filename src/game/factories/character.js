import {
  assoc,
  head,
  pipe,
  nth,
  __,
} from 'ramda'

import { roll } from '../core/dice'
import models from '../models'
import names from './names'

const template = {
  name: 'name unset',
  stance: 'stance unset',
  classId: 'classId unset',
  equips: {},
  flow: 5,
  exp: 0,
  acc: 5,
  ref: 5,
  str: 5,
  con: 5,
}

function create (playerId, classId) {
  return new Promise((resolve) => {
    const clas = models.classes.find(classId)

    resolve(roll(names.length).then(pipe(
      nth(__, names),
      assoc('name', __, template),
      assoc('classId', clas.id),
      assoc('playerId', playerId),
      assoc('stance', head(clas.stances)),
    )))
  })
}

export default {
  create,
}
