const { stanceFromName } = require('./stances')

const skills = [
  {
    name: 'Arcane Missels',
    stance: 'Arcane',
    influence: 10,
    cooldown: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Stunning Stars',
    stance: 'Arcane',
    influence: 5,
    cooldown: 2,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
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
    cooldown: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 7
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Pyroblast',
    stance: 'Arcane',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 13
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Sickness',
    stance: 'Debuff',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Soul Strike',
    stance: 'Debuff',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 5
      defender.hp = Math.max(defender.hp - damage, 0)
      defender.aspd = defender.aspd * 0.8
      modifiers.push('-ASPD')
      return damage
    },
  },
  {
    name: 'Locus Plague',
    stance: 'Debuff',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 8
      defender.hp = Math.max(defender.hp - damage, 0)
      defender.aspd = defender.aspd * 0.8
      modifiers.push('-ASPD')
      return damage
    },
  },
  {
    name: 'Curse',
    stance: 'Debuff',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 11
      defender.hp = Math.max(defender.hp - damage, 0)
      defender.aspd = defender.aspd * 0.8
      modifiers.push('-ASPD')
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Shield Up',
    stance: 'Tank',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk/2
      defender.hp = Math.max(defender.hp - damage, 0)
      attacker.def = attacker.def * 1.2
      modifiers.push('+DEF')
      return damage
    },
  },
  {
    name: 'Shield Smash',
    stance: 'Tank',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 5
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Iron Garden',
    stance: 'Tank',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
      defender.hp = Math.max(defender.hp - damage, 0)
      attacker.def = attacker.def * 1.6
      modifiers.push('++DEF')
      return damage
    },
  },
  {
    name: 'Heavenly Fall',
    stance: 'Tank',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.vit/1.5
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Rage',
    stance: 'Berserk',
    influence: 15,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk/2
      defender.hp = Math.max(defender.hp - damage, 0)
      attacker.atk = Math.max(attacker.atk * 1.2)
      modifiers.push('+ATK')
      return damage
    },
  },
  {
    name: 'Last Hope',
    stance: 'Berserk',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk
      defender.hp = Math.max(defender.hp - damage, 0)
      attacker.atk = Math.max(attacker.atk * 1.2)
      modifiers.push('+ATK')
      attacker.atk = Math.max(attacker.aspd * 1.2)
      modifiers.push('+APSD')
      return damage
    },
  },
  {
    name: 'Steal Strike',
    stance: 'Loot',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Poison Blade',
    stance: 'Loot',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 5
      defender.hp = Math.max(defender.hp - damage, 0)
      defender.aspd = defender.aspd * 0.8
      modifiers.push('-ASPD')
      return damage
    },
  },
  {
    name: 'Blind Spot',
    stance: 'Loot',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 10
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Fade Out',
    stance: 'Stealth',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      defender.hp = Math.max(defender.hp - damage, 0)
      attacker.dodge = attacker.dodge * 1.2
      modifiers.push('+DODGE')
      return damage
    },
  },
  {
    name: 'Backstab',
    stance: 'Stealth',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Unholy Strenght',
    stance: 'Heretic',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      defender.hp = Math.max(defender.hp - damage, 0)
      attacker.atk = attacker.atk * 1.2
      modifiers.push('+ATK')
      return damage
    },
  },
  {
    name: 'Angelic Speed',
    stance: 'Heretic',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 5
      defender.hp = Math.max(defender.hp - damage, 0)
      attacker.aspd = attacker.aspd * 1.2
      modifiers.push('+ASPD')
      return damage
    },
  },
  {
    name: 'Demonic Burst',
    stance: 'Heretic',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Holy Wrath',
    stance: 'Priest',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Heal',
    stance: 'Priest',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      modifiers.push('HEAL')
      attacker.hp = Math.max(attacker.hp  + damage, attacker.maxHp)
      return damage
    },
  },
  {
    name: 'Bless Armor',
    stance: 'Priest',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk
      defender.hp = Math.max(defender.hp - damage, 0)
      attacker.def = attacker.def * 1.6
      modifiers.push('++DEF')
      return damage
    },
  },
  {
    name: "God's Justice",
    stance: 'Priest',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 15
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Quick Shot',
    stance: 'Sniper',
    influence: 20,
    action: (attacker, defender, modifiers) => {
      const damage = Math.sqrt(attacker.dex) * 10
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'ChargedShot',
    stance: 'Sniper',
    influence: 7,
    action: (attacker, defender, modifiers) => {
      const damage = Math.sqrt(attacker.dex) * 30
      defender.hp = Math.max(defender.hp - damage, 0)
      defender.aspd = Math.max(defender.aspd * 0.8)
      modifiers.push('-ASPD')
      return damage
    },
  },
  {
    name: 'Explosive Arrow',
    stance: 'Sniper',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 10
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Arrow Burst',
    stance: 'Sniper',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = Math.sqrt(attacker.dex) * 50
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Glue Trap',
    stance: 'Trapper',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 4
      defender.hp = Math.max(defender.hp - damage, 0)
      defender.aspd = Math.max(defender.aspd * 0.8)
      modifiers.push('-ASPD')
      return damage
    },
  },
  {
    name: 'Explosive Trap',
    stance: 'Trapper',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 8
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Stun Bomb',
    stance: 'Trapper',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 10
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Ultimate Trap',
    stance: 'Trapper',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 20
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Identify Weakness',
    stance: 'Efficient',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
      defender.hp = Math.max(defender.hp - damage, 0)
      defender.def = defender.def * 0.8
      modifiers.push('-DEF')
      return damage
    },
  },
  {
    name: 'Look, Shiny!',
    stance: 'Efficient',
    influence: 6,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 4
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Anvil Smash',
    stance: 'Efficient',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 7
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Golden Hammer',
    stance: 'Breaker',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Anvil Throw',
    stance: 'Breaker',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 5
      defender.hp = Math.max(defender.hp - damage, 0)
      return damage
    },
  },
  {
    name: 'Damage the Merchandise',
    stance: 'Breaker',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 6
      defender.hp = Math.max(defender.hp - damage, 0)
      defender.def = defender.def * 0.8
      modifiers.push('-DEF')
      return damage
    },
  },
  {
    name: 'BREAK!',
    stance: 'Breaker',
    influence: 1,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 8
      defender.hp = Math.max(defender.hp - damage, 0)
      modifiers.push('STUN')
      defender.def = defender.def * 0.8
      modifiers.push('-DEF')
      defender.stunned = true
      return damage
    },
  },
]

module.exports = {
  castFromStance
}

function castFromStance (attacker, defender, modifiers) {
  if(!attacker.cooldown)
  {
    attacker.cooldown = []
  }
  const stanceSkills = skills.filter(function(skill,item){
     if(skill.stance === attacker.stance){
      for(var i = 0; i < attacker.cooldown.length; i++){

          if(attacker.cooldown[i].name == skill.name){
            var onCooldown = true
          }
        }
        if(!onCooldown){
          return true
        }
      }
  })
  if (stanceSkills.length === 0) { return {} }

  const pool = stanceSkills.reduce((acc, skill) => [
    ...acc,
    ...Array.from({ length: skill.influence }).map(() => skill),
  ], [])
  const randomSkill = pool[Math.floor(Math.random() * pool.length)]
  if(randomSkill.cooldown){
  attacker.cooldown.push({ name: randomSkill.name,cooldown: randomSkill.cooldown });
  
  }

  return {
    action: `${stanceFromName(attacker.stance).emoji} ` + randomSkill.name,
    damage: randomSkill.action(attacker, defender, modifiers),
  }
}
