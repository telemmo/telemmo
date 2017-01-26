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
    
    fire: (combat) => {
      const aim = view(defenderAim, combat)
      const newAim = aim/8
      const damage = 0
      return {
        combat: set(
          defenderAim,
          newAim,
          combat,
        ),
        cast: {
          skill: 'Poison Dagger',
          type: 'aim debuff',
          value: newAim,
        },
      }
    },
  },
]
