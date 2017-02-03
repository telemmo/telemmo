const expTable =
  Array.from({ length: 101 }).map((el, i) => 23 * i * i * i)

export function level (fighter) {
  return expTable
    .reduce((acc, lvlExp, lvl) => {
      if (fighter.exp > lvlExp) {
        return lvl
      }
      return acc
    }, 0)
}

export function percentageToNextLevel (fighter) {
  const fighterLvl = level(fighter)
  console.log(fighterLvl)
  if (level >= 100) {
    return null
  }
  const nextLevel = fighterLvl + 1
  const fullExpLevel = expTable[fighterLvl]
  const fullExpNextLevel = expTable[nextLevel]
  return 1 - (fullExpNextLevel - fighter.exp) / (fullExpNextLevel - fullExpLevel)
}
