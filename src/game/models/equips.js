import {
  lensPath,
  view,
  set,
} from 'ramda'

const defenderAim = lensPath(['teams', 1, 'overall', 'aim'])

export default [
  {
    id: 'leaf_blade',
    name: 'Leaf Blade',
    type: 'weapon',
    bonus: {
      str: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 19,
      defender: {
        hp: - ( 5 + attacker.lvl/10),
      },
      log: {
        type: 'damage',
        value: 5 + attacker.lvl/10,
      },
    }),
  },
  {
    id: 'foliage',
    name: 'Foliage',
    type: 'set',
    bonus: {
      con: 10,
    },
  },
  {
    id: 'golden_beetle',
    name: 'Golden Beetle',
    type: 'token',
    bonus: {
      flow: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aSkill < 19,
      attacker: {
        hp: 5 + attacker.lvl/10,
      },
      log: {
        type: 'heal',
        value: 5 + attacker.lvl/10,
      },
    }),
  },
]
