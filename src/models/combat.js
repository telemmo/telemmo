module.exports = {
  combatStats,
}

function combatStats (fighter) {
  const built = Object.assign({}, fighter, {
    maxHp: 20 + fighter.vit,
    hp:  20 + fighter.vit,
    aspd: 200 - fighter.agi,
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
  })
  return built
}
