const { randomFromMap } = require('./models/monsters')
const { buildDrop, getEmoji } = require('./models/gems')
const { combatStats } = require('./models/combat')
const { playerFromId } = require('./persistence').player

module.exports = {
  start
}

const timers = {}

const clearTimer = (name) => {
  if (timers[name] !== undefined) {
    clearTimeout(timers[name])
    timers[name] = undefined
  }
}

function start (bot, map, msg, $player = playerFromId(msg.from.id)) {
  $player.get().then((player) => {
    clearTimer(player.first_name)
    timers[player.first_name] = setTimeout(() => {
      afterCombat = combat(player.character, randomFromMap(map))
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
    }, (Math.random() * 60 + 15) * 1000)
  })
}

function combat (fighter1, fighter2) {
  const fighters = [combatStats(fighter1), combatStats(fighter2)]
	var log = `A wild ${fighter2.name} appeared!\n\n`
  var winner = null
  var drop = {}
  var time = 0

	while (winner === null) {
    const willAttack = fighters
      .filter(fighter => time % Math.floor(1000/fighter.aspd) === 0)

    if (time !== 0 && willAttack) {
			willAttack.forEach(fighter => {
        if (fighter.hp <= 0) { return }
				const afterAttack = attack(fighter, getDefender(fighters, fighter))
        log += afterAttack.log
        if (afterAttack.winner) {
          winner = afterAttack.winner
          drop = afterAttack.drop ? afterAttack.drop : {}
          log += `\n${afterAttack.winner} won!\n${viewDrop(afterAttack.drop)}`
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

function viewDrop (drop) {
  return Object.keys(drop)
    .map(name => `${getEmoji(name)} +${drop[name]}\n`).join('')
}

function getDefender (fighters, attacker) {
  const i = fighters.indexOf(attacker)
  return fighters[(i + 1)%2]
}

function attack (attacker, defender) {
  var log = ''
  var action = 'attacked'
  var damage = Math.floor(attacker.atk - attacker.atk*attacker.atkVariation*Math.random() - defender.def)
  if (Math.random() < attacker.critChance) {
    action = 'CRITTED'
    damage = Math.floor(damage * attacker.critDmg)
  }
  const trueDamage = Math.max(damage, 0)
  const hpAfterDamage = defender.hp - trueDamage
  defender.hp = Math.max(hpAfterDamage, 0)

  log += buildAttackLog(attacker, defender, action, trueDamage)

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

function buildAttackLog (attacker, defender, action, number) {
  return `_${attacker.name} ${action} for ${number} dmg_.
*${defender.name}* has *${Math.ceil(defender.hp/defender.maxHp * 100)}% hp* (${defender.hp}/${defender.maxHp})
`
}


