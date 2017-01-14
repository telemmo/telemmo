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
    maxHp: 50 + Math.floor(fighter.vit*10),
    hp:  50 + Math.floor(fighter.vit*10),
    aspd: Math.floor(Math.pow(fighter.agi,2)/(fighter.agi+100) + 50),
    atk: 5 + fighter.str + fighter.dex/2,
    mAtk: fighter.int*2,
    def: Math.min(0.95, fighter.vit/(100 + fighter.vit)),
    atkVariation: Math.min(0.3, 100/(3*(100+fighter.dex))),
    castSpeed: Math.floor(Math.pow(fighter.dex, 2)/(fighter.dex+200)) + 20,
    stunChance: 0,
    dropRatio: 1 + fighter.luk/350,
    dodge: Math.min(0.03 + (fighter.agi/(fighter.agi+400)), 0.8),
    critChance: Math.min(fighter.luk/(fighter.luk+500), 0.9),
    critDmg: 1.6 + fighter.str/1000 + fighter.luk/1000,
    mDef: Math.min(0.95, fighter.int/(200 + fighter.int)),
  }
}
