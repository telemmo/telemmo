const { stanceFromName } = require('./stances')

const skills = [
  {
    name: 'Arcane Missels',
    stance: 'Arcane',
    influence: 10,
    cooldown: 1,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      return damage
    },
  },
  {
    name: 'Stunning Stars',
    stance: 'Arcane',
    influence: 5,
    cooldown: 2,
    type: 'True',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Fireball',
    stance: 'Arcane',
    influence: 3,
    cooldown: 4,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
      return damage
    },
  },
  {
    name: 'Pyroblast',
    stance: 'Arcane',
    influence: 1,
    cooldown: 14,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 5
      return damage
    },
  },
  {
    name: 'Sickness',
    stance: 'Debuff',
    influence: 10,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      if(attacker.passive.debuff < 5){
        const damage = attacker.mAtk * 0.8
        attacker.passive.debuff += 1
        modifiers.push('+DEBUFF')
      }else{
        const damage = attacker.mAtk * 5
        attacker.passive.debuff = 0
        modifiers.push('--DEBUFF')
      }  
      return damage
    },
  },
  {
    name: 'Soul Strike',
    stance: 'Debuff',
    influence: 5,
    cooldown: 3,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      defender.aspd = defender.aspd * 0.8
      modifiers.push('-ASPD')
      attacker.passive.debuff += 1
      modifiers.push('+DEBUFF')
      return damage
    },
  },
  {
    name: 'Locus Plague',
    stance: 'Debuff',
    influence: 3,
    cooldown: 3,
    type: 'True',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2.5
      defender.mDef = defender.mDef * 0.8
      attacker.passive.debuff += 1
      modifiers.push('-Magic Defense')
      modifiers.push('+DEBUFF')
      return damage
    },
  },
  {
    name: 'Curse',
    stance: 'Debuff',
    influence: 1,
    cooldown: 5,
    type: 'True',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
      defender.aspd = defender.aspd * 0.8
      modifiers.push('-ASPD')
      modifiers.push('STUN')
      modifiers.push('++DEBUFF')
      attacker.passive.debuff = 5
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Shield Up',
    stance: 'Tank',
    influence: 10,
    cooldown: 2,
    type: 'Physical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk
      attacker.def = attacker.def * 1.2
      modifiers.push('+DEF')
      return damage
    },
  },
  {
    name: 'Shield Smash',
    stance: 'Tank',
    influence: 5,
    cooldown: 5,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Iron Garden',
    stance: 'Tank',
    influence: 3,
    cooldown: 5,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2.5
      attacker.def = attacker.def * 1.6
      modifiers.push('++DEF')
      return damage
    },
  },
  {
    name: 'Heavenly Fall',
    stance: 'Tank',
    influence: 1,
    cooldown: 12,
    type: 'True',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.maxHp/2.5
      return damage
    },
  },
  {
    name: 'Rage',
    stance: 'Berserk',
    influence: 5,
    type: 'Physical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk*1.2
      if(attacker.passive.lasthope){
        if(attacker.passive.lasthope === true){
          attacker.hp += damage * 0.4
          var string = "+" + damage*0.4 + " HEAL"
          modifiers.push(string)
        }
      }
      return damage
    },
  },
  {
    name: 'Last Hope',
    stance: 'Berserk',
    influence: 1,
    type: 'Physical',
    cooldown: 15,
    duration: 5,
    action: function(attacker, defender, modifiers) {
      const damage = attacker.atk
      attacker.atk = Math.max(attacker.atk * 1.2)
      modifiers.push('+ATK')
      attacker.atk = Math.max(attacker.aspd * 1.2)
      modifiers.push('+APSD')
      modifiers.push('+IGNORING PAIN')
      attacker.passive.lasthope = true
      attacker.unkilable = true
      attacker.effects.push({ name: this.name, duration: this.duration, action: (attacker, modifiers) => {
        attacker.passive.lasthope = false
        attacker.unkilable = false
        modifiers.push('-IGNORING PAIN')
      }})
      return damage
    },
  },
  {
    name: 'Steal Strike',
    stance: 'Loot',
    influence: 10,
    type: 'Physical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      return damage
    },
  },
  {
    name: 'Poison Blade',
    stance: 'Loot',
    influence: 5,
    type: 'Physical',
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 5
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
      return damage
    },
  },
  {
    name: 'Fade Out',
    stance: 'Stealth',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
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
      return damage
    },
  },
  {
    name: 'Unholy Strenght',
    stance: 'Heretic',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
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
      return damage
    },
  },
  {
    name: 'Holy Wrath',
    stance: 'Priest',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
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
      return 0
    },
  },
  {
    name: 'Bless Armor',
    stance: 'Priest',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk
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
      return damage
    },
  },
  {
    name: 'Quick Shot',
    stance: 'Sniper',
    influence: 20,
    action: (attacker, defender, modifiers) => {
      const damage = Math.sqrt(attacker.dex) * 8
      return damage
    },
  },
  {
    name: 'ChargedShot',
    stance: 'Sniper',
    influence: 7,
    action: (attacker, defender, modifiers) => {
      const damage = Math.sqrt(attacker.dex) * 20
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
      const damage = attacker.mAtk * 15
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
      const damage = Math.sqrt(attacker.dex) * 30
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
      return damage
    },
  },
  {
    name: 'Stun Bomb',
    stance: 'Trapper',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 10
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
      return damage
    },
  },
  {
    name: 'Identify Weakness',
    stance: 'Efficient',
    influence: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
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
      return damage
    },
  },
  {
    name: 'Anvil Throw',
    stance: 'Breaker',
    influence: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 5
      return damage
    },
  },
  {
    name: 'Damage the Merchandise',
    stance: 'Breaker',
    influence: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 6
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

function skillDamageReduction(skilltype, defender) {
  if(skilltype === "True"){ return 0}
  if(skilltype === "Magic"){ return defender.mDef}
  if(skilltype === "Physical"){ return defender.def}

}

function castFromStance (attacker, defender, modifiers) {
  var skillReduction = 0
  if(!attacker.cooldown)
  {
    attacker.cooldown = []
  }
  const stanceSkills = skills
  .filter(skill => skill.stance === attacker.stance)
  .filter(skill => !attacker.cooldown.find(cd => cd.name === skill.name))


  if (stanceSkills.length === 0) { return {} }

  const pool = stanceSkills.reduce((acc, skill) => [
    ...acc,
    ...Array.from({ length: skill.influence }).map(() => skill),
  ], [])
  const randomSkill = pool[Math.floor(Math.random() * pool.length)]
  if(randomSkill.cooldown){
  attacker.cooldown.push({ name: randomSkill.name,cooldown: randomSkill.cooldown });
  
  }

  if(randomSkill.type){
    skillReduction = skillDamageReduction(randomSkill.type, defender)
  }
  skillDamage = randomSkill.action(attacker, defender, modifiers) * (1 - skillReduction)
  defender.hp = Math.max(defender.hp - skillDamage, 0) 
  return {
    action: `${stanceFromName(attacker.stance).emoji} ` + randomSkill.name,
    damage: skillDamage,
  }
}
