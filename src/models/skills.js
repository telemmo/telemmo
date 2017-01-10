const { stanceFromName } = require('./stances')

const skills = [
  {
    name: 'Arcane Missels',
    stance: 'Arcane',
    influence: 10,
    action: (attacker, defender) => {
      const damage = attacker.mAtk * 2
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Stunning Stars',
    stance: 'Arcane',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Fireball',
    stance: 'Arcane',
    influence: 3,
    action: (attacker, defender) => {
      const damage = attacker.mAtk * 6
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Pyroblast',
    stance: 'Arcane',
    influence: 1,
    action: (attacker, defender) => {
      const damage = attacker.mAtk * 12
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
]

module.exports = {
  castFromStance
}

function castFromStance (attacker, defender, modifiers) {
  const stanceSkills = skills.filter(skill => skill.stance === attacker.stance)
  if (stanceSkills.length === 0) { return {} }
  const pool = stanceSkills.reduce((acc, skill) => [
    ...acc,
    ...Array.from({ length: skill.influence }).map(() => skill),
  ], [])
  const randomSkill = pool[Math.floor(Math.random() * pool.length)]
  return {
    action: `${stanceFromName(attacker.stance).emoji} ` + randomSkill.name,
    damage: randomSkill.action(attacker, defender, modifiers),
  }
}
