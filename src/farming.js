const { randomFromMap } = require('./models/monsters')

module.exports = {
  start
}

function start (bot, player, map, msg) {
  setTimeout(() => {
    afterCombat = combat(player.character, randomFromMap(map))
    bot.sendMessage(
      msg.chat.id,
      afterCombat.log,
      { parse_mode: 'Markdown' }
    )
    start(bot, player, map, msg)
  }, (Math.random() * 60 + 15) * 1000)
}

function combat (fighter1, fighter2) {
  const fighters = [build(fighter1), build(fighter2)]
	var log = `A wild ${fighter2.name} appeared!\n\n`
  var winner = null
  var time = 0

	turns: while (winner === null) {
    const willAttack = fighters
      .filter(fighter => time % fighter.aspd === 0)

    if (time !== 0 && willAttack) {
			willAttack.forEach(fighter => {
				const afterAttack = attack(fighter, getDefender(fighters, fighter))
        log += afterAttack.log
        if (afterAttack.winner) {
          log += `${afterAttack.winner} won!`
          winner = afterAttack.winner
        }
			})
    }

    time += 1
  }

  return {
    log,
    winner
  }
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
    }
  }
  return {
    log,
    winner: null,
  }
}

function buildAttackLog (attacker, defender, action, number) {
  return `*${attacker.name}* ${action} ${defender.name} for *${number}* dmg.
${defender.name} -${
  Array.from({ length: 20 })
    .map((el, i) =>
      (defender.hp/defender.maxHp) * 20 >= i
        ? '|'
        : ' '
    ).join('')
}- HP%

`
}
