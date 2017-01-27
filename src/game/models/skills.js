import {
  lensPath,
  view,
  set,
} from 'ramda'

const defenderHp = lensPath(['teams', 1, 'overall', 'hp'])
const defenderDef = lensPath(['teams', 1, 'overall', 'def'])
const attackerAtk = lensPath(['teams', 0, 'overall', 'atk'])

export default [
  {
    id: 'fireball',
    name: 'Fireball',
    fire: (attacker, defender, rolls) => ({
      defender: {
        hp: attacker.atk - (defender.def / 2)
      },
      log: {
        type: 'damage',
        value: attacker.atk - (defender.def / 2)
      }
    })
  },
]
