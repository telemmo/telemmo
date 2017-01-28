import {
  lensPath,
  merge,
  add,
  mergeWith,
  set,
  view,
} from 'ramda'


const attackerLens = lensPath(['teams', 0, 'overall'])
const defenderLens = lensPath(['teams', 1, 'overall'])

export default function castSkill (obj, combat, rolls) {
  const attacker = view(attackerLens, combat)
  const defender = view(defenderLens, combat)
  const skillName = obj.name
  const afterCast = obj.fire(attacker, defender, rolls)
  if (afterCast.noCast) { return }

  if (afterCast.defender.hp > 0) {
    afterCast.defender.hp = 0
  }

  if (afterCast.attacker) {
    combat = set(
      attackerLens,
      mergeWith(add, attacker, afterCast.attacker),
      combat,
    )
  }
  if (afterCast.defender) {
    combat = set(
      defenderLens,
      mergeWith(add, defender, afterCast.defender),
      combat,
    )
  }

  return {
    combat,
    cast: {
      skill: skillName,
      type: afterCast.log.type,
      value: afterCast.log.value.toFixed(2),
    }
  }
}
