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
    description: 'A set of clothes made from spider web.',
    type: 'set',
    bonus: {
      def: 5,
    },
  },
  {
    id: 'spidy',
    name: 'Spidy',
    description: 'A small spider companion',
    type: 'token',
    bonus: {
      atk: 5,
      def: 5,
    },
  },
  {
    id: 'poison_dagger',
    name: 'Poison Dagger',
    description: 'A dagger poisoned with snake venom. Deals more damage if you roll 19 or higher in AIM d20',
    type: 'weapon',
    bonus: {
      atk: 5,
    },
    fire: (attacker, defender, rolls) => ({
      noCast: rolls.aim < 19,
      defender: {
        aim: -defender.aim * 0.2,
      },
      log: {
        type: 'aim debuff',
        value: -defender.aim * 0.2
      }
    }),
  },
]
