const { randomFromMap } = require('./models/monsters')

module.exports = {
  start
}

function start (bot, player, map, msg) {
  setTimeout(() => {
    bot.sendMessage(
      msg.chat.id,
      prepare(player.character, randomFromMap(map))
    )
    start(bot, player, map, msg)
  }, (Math.random() * 60 + 15) * 1000)
}


function prepare (fighter1, fighter2) {
  fighter1 = build(fighter1)
  fighter2 = build(fighter2)
  return combat(fighter1, fighter2)
}

function combat (fighter1, fighter2) {
  const fighters = [fighter1, fighter2]
	var fightLog = ''
  var time = 0

	while (fighter1.hp > 0 && fighter2.hp > 0) {
    const willAttack = fighters.filter(fighter => time % fighter.aspd === 0)
    if (time !== 0 && willAttack) {
			willAttack.forEach(fighter => {
				const i = fighters.indexOf(fighter)
				fightLog += attack(fighter, fighters[(i + 1)%2])
			})
    }
    time += 1
  }

	return fightLog
}

function build (fighter) {
  const built = Object.assign({}, fighter, {
    maxHp: 20 + fighter.vit,
    hp:  20 + fighter.vit,
    aspd: 200 - fighter.agi,
		atk: 10 + fighter.str,
		def: 5 + Math.floor(fighter.vit/2)
  })
  return built
}

function attack (attacker, defender) {
	const damage = Math.floor(attacker.atk * (Math.random() + 0.5) - defender.def)
  const trueDamage = damage > 0 ? damage : 0
	defender.hp -= trueDamage
  if (defender.hp <= 0) {
    return `${attacker.name} attacked for ${trueDamage}
${defender.name} died.`
  }
  return `${attacker.name} attacked for ${trueDamage}
${defender.name} has ${defender.hp}/${defender.maxHp}hp
`
}
