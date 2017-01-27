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
    fire: (combat) => {
      const hp = view(defenderHp, combat)
      const atk = view(attackerAtk, combat)
      const def = view(defenderDef, combat)
      // const damage = view(attackerAtk, combat) - view(defenderDef, combat)/2
      const damage = atk - (def / 2)
      return {
        combat: set(
          defenderHp,
          hp - damage,
          combat,
        ),
        cast: {
          skill: 'Fireball',
          type: 'damage',
          value: damage,
        },
      }
    },
  },
]
