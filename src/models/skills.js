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
      console.log(attacker.passive.debuff)
      damage = attacker.mAtk * 0.8
      if(!attacker.passive.debuff){ attacker.passive.debuff = 0}
      if(attacker.passive.debuff < 5){
        attacker.passive.debuff += 1
        modifiers.push('+DEBUFF')
      }else{
        damage = attacker.mAtk * 5
        attacker.passive.debuff = 0
        modifiers.push('--DEBUFF')
      } 
      if (Math.random() < attacker.stunChance) {
        modifiers.push('STUN')
        defender.stunned = true
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
      if (Math.random() < attacker.stunChance) {
        modifiers.push('STUN')
        defender.stunned = true
      } 
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
      if (Math.random() < attacker.stunChance) {
        modifiers.push('STUN')
        defender.stunned = true
      } 
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
          Math.min(attacker.hp  + damage*0.4, attacker.maxHp)
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
      attacker.effects.push({ name: this.name, duration: this.duration, action: (fighter, enemy, modifiers) => {
        fighter.passive.lasthope = false
        fighter.unkilable = false
        if(modifiers){modifiers.push('-IGNORING PAIN')}
        
      }})
      return damage
    },
  },
  {
    name: 'Explosive Strike',
    stance: 'Loot',
    influence: 10,
    type: 'Physical',
    cooldown: 1,
    duration: 3,
    action: function(attacker, defender, modifiers) {
      const damage = attacker.atk
      modifiers.push('+Explosives')
      //This effect action goes to the enemy effects
      defender.effects.push({ name: this.name, duration: this.duration, action: (fighter, enemy, modifiers) => {
        var skillDamage = enemy.mAtk * 1.5
        fighter.hp = Math.max(fighter.hp - skillDamage, 0) 
        var string = '+' + skillDamage + ' DAMAGE DUE TO EXPLOSIVES'
        if(modifiers){modifiers.push(string)}
        
      }})
      return damage
    },
  },
  {
    name: 'Poison Blade',
    stance: 'Loot',
    influence: 5,
    type: 'Physical',
    cooldown: 3,
    duration : 1,
    action: function(attacker, defender, modifiers) {
      const damage = attacker.atk*1.5
      defender.aspd = defender.aspd * 0.8
      modifiers.push('-ASPD')
      modifiers.push('+POISON')
       defender.effects.push({ name: this.name, duration: this.duration, action: (fighter, enemy, modifiers) => {
        var skillDamage = enemy.mAtk * 2 + fighter.hp*0.1
        skillDamage = Math.ceil(skillDamage)
        fighter.hp = Math.max(fighter.hp - skillDamage, 0) 
        var string = '+' + skillDamage + ' DAMAGE DUE TO POISON'
        if(modifiers){modifiers.push(string)}
      }})

      return damage
    },
  },
  {
    name: 'Leech',
    stance: 'Loot',
    influence: 1,
    type: 'Physical',
    cooldown: 10,
    duration: 2,
    action: function(attacker, defender, modifiers)  {
      const damage = attacker.atk * 2
      modifiers.push('+LEECH')
      defender.effects.push({ name: this.name, duration: this.duration, action: (fighter, enemy, modifiers) => {
        var skillDamage = enemy.mAtk * 2.5
        fighter.hp = Math.max(fighter.hp - skillDamage, 0) 
        var string =  skillDamage + ' HP TRANSFERED DUE TO LEECH'
        enemy.hp += skillDamage
        if(modifiers){modifiers.push(string)}
      }})
      return damage
    },
  },
  {
    name: 'Fade Out',
    stance: 'Stealth',
    influence: 10,
    type: 'Physical',
    cooldown: 4,
    duration: 2,
    action: function(attacker, defender, modifiers) {
      const damage = attacker.atk
      attacker.dodge += 1
      modifiers.push('+FADE')
      attacker.passive.fadeout = true
      attacker.effects.push({ name: this.name, duration: this.duration, action: (fighter, enemy, modifiers) => {
        fighter.dodge -= 1
        fighter.passive.fadeout = false
        modifiers.push('-FADE')
      }})
      return damage
    },
  },
  {
    name: 'Backstab',
    stance: 'Stealth',
    influence: 1,
    type: 'True',
    cooldown: 6,
    action: (attacker, defender, modifiers) => {
      damage = attacker.atk
      if(attacker.passive.fadeout){
        if(attacker.passive.fadeout === true){
          damage = attacker.atk * 3
          attacker.dodge -= 1
          attacker.passive.fadeout = false
          modifiers.push('-FADE')
        }
      }
      return damage
    },
  },
  {
    name: 'Unholy Strenght',
    stance: 'Heretic',
    influence: 10,
    type: 'Physical',
    cooldown: 6,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk * 1.5
      attacker.atk = attacker.atk * 1.2
      modifiers.push('+ATK')
      return damage
    },
  },
  {
    name: 'Angelic Speed',
    stance: 'Heretic',
    influence: 5,
    type: 'Magical',
    cooldown: 6,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2
      attacker.aspd = attacker.aspd * 1.2
      modifiers.push('+ASPD')
      return damage
    },
  },
  {
    name: 'Demonic Burst',
    stance: 'Heretic',
    influence: 1,
    type: 'True',
    cooldown: 10,
    action: (attacker, defender, modifiers) => {
      damage = (attacker.atk*2 + attacker.mAtk*2)/2
      damage = Math.ceil(damage)
      return damage
    },
  },
  {
    name: 'Holy Wrath',
    stance: 'Priest',
    influence: 10,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      if(!attacker.passive.holy){attacker.passive.holy = 0}
      const damage = attacker.mAtk * 0.5 + (attacker.mAtk*(attacker.passive.holy)/2)
      attacker.passive.holy += 1
      return damage
    },
  },
  {
    name: 'Heal',
    stance: 'Priest',
    influence: 5,
    cooldown: 4,
    action: (attacker, defender, modifiers) => {
      if(!attacker.passive.holy){attacker.passive.holy = 0}
      const damage = attacker.mAtk + (attacker.mAtk*(attacker.passive.holy)/2)
      var string = '+ ' + damage + ' HEAL'
      modifiers.push(string)
      attacker.hp = Math.min(attacker.hp  + damage, attacker.maxHp)
      attacker.passive.holy += 1
      return 0
    },
  },
  {
    name: 'Bless Armor',
    stance: 'Priest',
    influence: 3,
    cooldown: 4,
    action: (attacker, defender, modifiers) => {
      if(!attacker.passive.holy){attacker.passive.holy = 0}
      attacker.def = Math.min(attacker.def * 1.2, 0.95)
      attacker.mDef = Math.min(attacker.mDef * 1.2, 0.95)
      modifiers.push('+DEF +MDEF')
      attacker.passive.holy += 1
      return 0
    },
  },
  {
    name: "God's Justice",
    stance: 'Priest',
    influence: 1,
    type: 'Magical',
    cooldown: 8,
    action: (attacker, defender, modifiers) => {
      if(!attacker.passive.holy){attacker.passive.holy = 1}
      const damage = attacker.mAtk/2 * attacker.passive.holy
      return damage
    },
  },
  {
    name: 'Quick Shot',
    stance: 'Sniper',
    influence: 5,
    type: 'Physical',
    action: function(attacker, defender, modifiers) {
      if(!attacker.passive.quickshot){attacker.passive.quickshot = 0}
      this.name = 'Quick Shot'
      this.type = 'Physical'
      attacker.passive.quickshot += 1
      damage = attacker.dex + attacker.atk
      if(attacker.passive.quickshot === 2){
        this.name = 'Charged Shot'
        damage = attacker.dex*2 + attacker.atk
        defender.aspd = Math.max(defender.aspd * 0.8)
        modifiers.push('-ASPD')
      }else if(attacker.passive.quickshot === 3){
        this.name = 'Critical Shot'
        damage = attacker.dex*3 + attacker.atk
        attacker.passive.quickshot = 0
        defender.def = defender.def * 0.8
        modifiers.push('-DEF')
        this.type = 'True'
      }
      return damage
    },
  },
  {
    name: 'Explosive Arrow',
    stance: 'Sniper',
    influence: 3,
    type: 'Magical',
    cooldown: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 3
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Glue Trap',
    stance: 'Trapper',
    influence: 1,
    type: 'Magical',
    cooldown: 2,
    action: function(attacker, defender, modifiers) {
      const damage = attacker.mAtk
      randomDuration = Math.floor(Math.random() * 5) + 1;
      defender.effects.push({ name: this.name, duration: randomDuration, action: (fighter, enemy, modifiers) => {
        fighter.aspd = Math.max(fighter.aspd * 0.8)
        modifiers.push('+GLUE TRAP')
      }})
      return damage
    },
  },
  {
    name: 'Explosive Trap',
    stance: 'Trapper',
    influence: 1,
    type: 'Magical',
    cooldown: 2,
    action: function(attacker, defender, modifiers) {
      const damage = attacker.mAtk
      randomDuration = Math.floor(Math.random() * 5) + 1;
      defender.effects.push({ name: this.name, duration: randomDuration, action: (fighter, enemy, modifiers) => {
        skillDamage = enemy.mAtk*2
        fighter.hp = Math.max(fighter.hp - skillDamage, 0) 
        modifiers.push('+EXPLOSIVE TRAP')
      }})
      return damage
    },
  },
  {
    name: 'Stun Trap',
    stance: 'Trapper',
    influence: 1,
    type: 'Magical',
    cooldown: 2,
    action: function(attacker, defender, modifiers) {
      const damage = attacker.mAtk
      randomDuration = Math.floor(Math.random() * 5) + 1;
      defender.effects.push({ name: this.name, duration: randomDuration, action: (fighter, enemy, modifiers) => {
        fighter.stunned = true 
        modifiers.push('+STUN TRAP')
      }})
      return damage
    },
  },
  {
    name: 'Ultimate Trap',
    stance: 'Trapper',
    influence: 1,
    type: 'Magical',
    cooldown: 10,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 4

      defender.stunned = true 
      modifiers.push('+STUN TRAP')
      modifiers.push('+EXPLOSIVE TRAP')
      defender.aspd = Math.max(defender.aspd * 0.8)
      modifiers.push('+GLUE TRAP')
      return damage
    },
  },
  {
    name: 'Identify Weakness',
    stance: 'Efficient',
    influence: 5,
    type: 'Magical',
    cooldown: 6,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk
      defender.def = defender.def * 0.8
      modifiers.push('-DEF')
      return damage
    },
  },
  {
    name: 'Look, Shiny!',
    stance: 'Efficient',
    influence: 10,
    type: 'Magical',
    action: (attacker, defender, modifiers) => {
      damage = attacker.mAtk
      if(Math.random() < attacker.critChance){
        var foundsomething = Math.floor(Math.random() * 5) + 1;
        if(foundsomething === 1) {
          defender.stunned = true
          modifiers.push('A STUN BOMB!')
        }
        if(foundsomething === 2) {
          modifiers.push('OMG A HEAL STONE!')
          Math.min(attacker.hp  + attacker.mAtk*3, attacker.maxHp)
        }
        if(foundsomething === 3) {
          modifiers.push('IS THAT A WEAPON?')
          attacker.atk += Math.ceil(attacker.mAtk/2)
        }
        if(foundsomething === 4) {
          modifiers.push('IT BURNS!!')
          damage = attacker.mAtk*4.5
        }
        if(foundsomething === 5) {
          modifiers.push('FAIRY DUST?!')
          defender.mDef = defender.mDef*0.6
        }
      }
      
      return damage
    },
  },
  {
    name: 'Anvil Smash',
    stance: 'Efficient',
    influence: 1,
    type: 'True',
    cooldown: 6,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.mAtk * 2.2
      modifiers.push('STUN')
      defender.stunned = true
      return damage
    },
  },
  {
    name: 'Golden Hammer',
    stance: 'Breaker',
    influence: 10,
    type: 'Physical',
    cooldown: 3,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk * 2
      return damage
    },
  },
  {
    name: 'Anvil Throw',
    stance: 'Breaker',
    influence: 5,
    type: 'Physical',
    cooldown: 5,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk * 3
      return damage
    },
  },
  {
    name: 'Damage the Merchandise',
    stance: 'Breaker',
    influence: 3,
    type: 'Physical',
    cooldown: 8,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk * 2
      defender.def = defender.def * 0.8
      modifiers.push('-DEF')
      return damage
    },
  },
  {
    name: 'BREAK!',
    stance: 'Breaker',
    influence: 1,
    type: 'Physical',
    cooldown: 15,
    action: (attacker, defender, modifiers) => {
      const damage = attacker.atk * 2.5
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
  if(skilltype === "Magical"){ return defender.mDef}
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
