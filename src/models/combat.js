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
    combatStats = applyBuff(stance.buffs(combatStats), combatStats)
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
    maxHp: 50 + Math.floor(fighter.vit/1.5),
    hp:  50 + Math.floor(fighter.vit/1.5),
    aspd: fighter.agi * 2 + 50,
    atk: 10 + fighter.str + Math.floor(fighter.dex/2),
    def: 5 + Math.floor(fighter.vit/2),
    atkVariation: 0.3 - fighter.dex/350,
    skillCast: Math.min(0.9, 0.1 + fighter.dex/250),
    stunChance: 0,
    dropRatio: 1 + fighter.luk/250,
    dodge: Math.min(0.03 + fighter.agi/3000, 0.8),
    critChance: Math.min(fighter.luk/400, 0.9),
    critDmg: 2 + fighter.str/200 + fighter.luk/200,
  }
}
