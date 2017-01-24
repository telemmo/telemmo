import {
  lensPath,
  view,
  set,
} from 'ramda'

const defenderHp = lensPath(['teams', 1, 'overall', 'hp'])

export default [
  {
    name: 'fireball',
    fire: (combat) => {
      const hp = view(defenderHp, combat)

      return {
        combat: set(
          defenderHp,
          hp - 10000,
          combat,
        ),
        cast: {
          skill: 'fireball',
          type: 'damage',
          value: hp - 10000,
        },
      }
    },
  },
]
