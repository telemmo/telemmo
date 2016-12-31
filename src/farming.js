const { randomFromMap } = require('./models/monsters')
const { buildDrop, getEmoji } = require('./models/gems')
const persistence = require('./persistence')
const { playerFromId } = persistence.player


module.exports = {
  start
}

function start (bot, player, map, msg, $player = playerFromId(msg.from.id)) {
  setTimeout(() => {
    afterCombat = combat(player.character, randomFromMap(map))
    if (afterCombat.winner === player.character.name) {
      if (Object.keys(afterCombat.drop).length !== 0) {
        $player.giveGems(afterCombat.drop)
      }
    }
    bot.sendMessage(
      msg.chat.id,
      afterCombat.log,
      { parse_mode: 'Markdown' }
    )
    start(bot, player, map, msg, $player)
  }, (Math.random() * 60 + 15) * 1000)
}

function combat (fighter1, fighter2) {
  const fighters = [build(fighter1), build(fighter2)]
	var log = `A wild ${fighter2.name} appeared!\n\n`
  var winner = null
  var drop = {}
  var time = 0

	turns: while (winner === null) {
    const willAttack = fighters
      .filter(fighter => time % fighter.aspd === 0)

    if (time !== 0 && willAttack) {
			willAttack.forEach(fighter => {
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

function build (fighter) {
  const built = Object.assign({}, fighter, {
    maxHp: 20 + fighter.vit,
    hp:  20 + fighter.vit,
    aspd: 200 - fighter.agi,
		atk: 10 + fighter.str,
		def: 5 + Math.floor(fighter.vit/2),
  })
  return built
}

function attack (attacker, defender) {
  var log = ''
  var action = 'attacked'
  var damage = Math.floor(attacker.atk * (Math.max(Math.random(), 0.6 + attacker.dex/200)) - defender.def)
  if (Math.random() * 100 < attacker.luk) {
    action = '*CRITTED*'
    damage = Math.floor(damage * 1.5 + damage * attacker.luk/100)
  }
  const trueDamage = Math.max(damage, 0)
  const hpAfterDamage = defender.hp - trueDamage
  defender.hp = Math.max(hpAfterDamage, 0)

  log += buildAttackLog(attacker, defender, action, trueDamage)

  if (defender.hp <= 0) {
    return {
      log,
      winner: attacker.name,
      drop: buildDrop(defender.loot)
    }
  }
  return {
    log,
    winner: null,
  }
}

function buildAttackLog (attacker, defender, action, number) {
  return `*${attacker.name}* ${action} for *${number} dmg*.
*${defender.name}* has *${Math.ceil(defender.hp/defender.maxHp * 100)}% hp* \`${buildHpBar(defender.hp, defender.maxHp)}\`
`
}

function buildHpBar(current, max) {
  return `<${
    Array.from({ length: 10 })
      .map((el, i) =>
        (current/max) * 10 >= i + 1
        ? '|'
        : ' '
      ).join('')
  }>`
}
