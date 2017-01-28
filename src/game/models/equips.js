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
      con: 5,
    },
  },
  {
    id: 'spidy',
    name: 'Spidy',
    type: 'token',
    bonus: {
      str: 5,
      con: 5,
    },
  },
  {
    id: 'poison_dagger',
    name: 'Poison Dagger',
    type: 'weapon',
    bonus: {
      str: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aim < 19,
      // defender: {
      //   // aim: -defender.aim * 0.2,
      // },
      log: {
        type: 'aim debuff',
        value: -defender.aim * 0.2
      }
    }),
  },
]
