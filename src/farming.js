const emoji = require('node-emoji')
const { randomFromMap } = require('./models/monsters')
const { buildDrop, getEmoji } = require('./models/gems')
const { combatStats } = require('./models/combat')
const { playerFromId } = require('./persistence').player
const { castFromStance } = require('./models/skills')

module.exports = {
  start
}

const timers = {}

const clearTimer = (id) => {
  if (timers[id] !== undefined) {
    clearTimeout(timers[id])
    timers[id] = undefined
  }
}

function start (bot, map, msg, $player = playerFromId(msg.from.id)) {
  $player.get().then((player) => {
    clearTimer(player.telegramId)
    timers[player.telegramId] = setTimeout(() => {
      const afterCombat = combat(player.character, randomFromMap(map))
      const playerWon = (afterCombat.winner === player.character.name)
      if (playerWon) {
        if (Object.keys(afterCombat.drop).length !== 0) {
          $player.giveGems(afterCombat.drop)
        }
      }
      bot.sendMessage(
        msg.chat.id,
        afterCombat.log,
        { parse_mode: 'Markdown' }
      )
      if (!playerWon) {
        clearTimer(player.first_name)
        return
      }
      start(bot, map, msg, $player)
    }, (Math.random() * 40 + 20) * 1000)
  })
}

function combat (fighter1, fighter2) {
  const fighters = [combatStats(fighter1), combatStats(fighter2)]
	var log = `*${fighter2.name}* _vs_ *${fighter1.name}*\n\n`
  var winner = null
  var drop = {}
  var time = 0

	while (winner === null) {
    const willAttack = fighters
      .filter(fighter => time % Math.ceil(2000/fighter.aspd) === 0)

    if (time !== 0 && willAttack) {
			willAttack.forEach(fighter => {
        if (fighter.hp <= 0) { return }
				const afterAttack = attack(fighter, getDefender(fighters, fighter))
        log += afterAttack.log
        if (afterAttack.winner) {
          winner = afterAttack.winner
          drop = afterAttack.drop ? afterAttack.drop : {}
          log = `${
            emoji.emojify(fighter.loot ? ':x:' : ':heavy_check_mark:')
          } ${afterAttack.winner} won!\n\n` + log + '\n' + viewDrop(afterAttack.drop)
        }
			})
    }
    time += 1
  }

  return {
    log,
    winner,
    drop
  }
}

function reduceCooldown (fighter) {
  for (i = 0; i < fighter.cooldown.length; i++) {
    if(fighter.cooldown[i][0] > 0) {
      fighter.cooldown[i][0] -= 1
    }else{
      fighter.cooldown = fighter.cooldown.filter(function(item) { 
        return item !== fighter.cooldown[i]
      })
      
    }

  }
}

function viewDrop (drop) {
  return Object.keys(drop).length !== 0 ? 'Loot: ' + Object.keys(drop)
        .map(name => `+${drop[name]} ${getEmoji(name)} `).join('')
      : ''
}

function getDefender (fighters, attacker) {
  const i = fighters.indexOf(attacker)
  return fighters[(i + 1)%2]
}

function attack (attacker, defender) {
  var log = ''
  var action = ''
  var modifiers = []

  if (attacker.stunned) {
    attacker.stunned = false
    return {
      log: `_${attacker.name} is stunned and lost a turn!_\n`,
      winner: null,
    }
  }
  if(attacker.cooldown){
    reduceCooldown(attacker);
  }
  if(defender.cooldown){
    reduceCooldown(defender);
  }

  if (attacker.stance && Math.random() < attacker.skillCast) {
    const cast = castFromStance(attacker, defender, modifiers)
    log += buildAttackLog(attacker, defender, cast.action, cast.damage, modifiers)
  } else {
    action = 'attacked'
    var damage = Math.floor(attacker.atk - attacker.atk*attacker.atkVariation*Math.random() - defender.def)
    if (Math.random() < attacker.critChance) {
      modifiers.push('CRIT')
      damage = Math.floor(damage * attacker.critDmg)
    }
    if (Math.random() < attacker.stunChance && damage !== 0) {
      modifiers.push('STUN')
      defender.stunned = true
    }
    var trueDamage = Math.max(damage, 1)
    if (Math.random() < defender.dodge) {
      modifiers.push('MISS')
      trueDamage = 0
    }
    const hpAfterDamage = defender.hp - trueDamage
    defender.hp = Math.max(hpAfterDamage, 0)
    log += buildAttackLog(attacker, defender, action, trueDamage, modifiers)
  }


  if (defender.hp <= 0) {
    return {
      log,
      winner: attacker.name,
      drop: buildDrop(defender.loot, attacker.dropRatio)
    }
  }
  return {
    log,
    winner: null,
  }
}

function buildAttackLog (attacker, defender, action, number, modifiers) {
  return emoji.emojify(`${
    attacker.loot ? ':large_orange_diamond:' : ':large_blue_diamond:'
  } _${attacker.name} ${action} for ${Math.round(number)} dmg_ *${modifiers.join(' ')}*
${(modifiers.indexOf('MISS') === -1) ? `${
  defender.hp <= 0 ? ':skull:' : defender.loot ? ':yellow_heart:' : ':blue_heart:'
} *${
  defender.name
}* has *${
  Math.ceil(defender.hp/defender.maxHp * 100)
}% hp* (${
  Math.round(defender.hp)}/${defender.maxHp
})
`
  : ''
}`)

}


