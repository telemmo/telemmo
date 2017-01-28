import {
  lensPath,
  view,
  set,
} from 'ramda'

const defenderAim = lensPath(['teams', 1, 'overall', 'aim'])

export default [
  {
    id: 'spider_web_clothes',
    name: 'Spider Web Clothes',
    type: 'set',
    bonus: {
      ref: 5,
      acc: 3,
    },
  },
  {
    id: 'spidy',
    name: 'Spidy',
    type: 'token',
    bonus: {
      acc: 10,
      ref: 10,
    },
  },
  {
    id: 'poison_dagger',
    name: 'Poison Dagger',
    type: 'weapon',
    bonus: {
      str: 8,
      acc: 4,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aAim < 19,
      defender: {
        ref: -defender.ref * 0.2,
      },
      log: {
        type: 'reflex debuff',
        value: -defender.ref * 0.2,
      },
    }),
  },
]
