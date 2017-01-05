const { stanceFromName } = require('./stances')

module.exports = {
  combatStats,
  getStats,
}

function combatStats (fighter) {
  var stats = getStats(fighter)
  var combatStats = Object.assign({}, fighter, stats)

  const stance = stanceFromName(fighter.stance)
  if (stance) {
    combatStats = applyBuff(stance.buffs(fighter), combatStats)
  }
  return combatStats
}

function applyBuff (buffs, stats) {
  Object.keys(buffs).forEach(statName => {
    stats[statName] = buffs[statName]
  })
  return stats
}

function getStats (fighter) {
  return {
    maxHp: 20 + fighter.vit,
    hp:  20 + fighter.vit,
    aspd: fighter.agi*2 + 50,
		atk: 10 + fighter.str,
		def: 5 + Math.floor(fighter.vit/2),
		atkVariation: 0.3 - fighter.dex/350,
    skillCast: 0.1 + fighter.dex/250,
    stunChance: 0,
    slowChance: 0,
    silenceChance: 0,
    dropRatio: 1 + fighter.luk/250,
    dodge: 0.05 + fighter.agi/400,
    wildRngDamage: false,
    accuracy: 0.65 + fighter.dex/200,
		critChance: fighter.luk/150,
		critDmg: 2 + fighter.str/100 + fighter.luk/200,
  }
}
