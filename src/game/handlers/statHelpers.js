export const statIds = {
  strength: 'str',
  constitution: 'con',
  reflex: 'ref',
  accuracy: 'acc',
  flow: 'flow',
}

function cost (stat) {
  return 5 * Math.floor(stat / 8) + 5
}

export function getStatCost (char, statName) {
  const statId = statIds[statName]
  const statCost = cost(char[statId])
  return statCost
}

export function getStatSpent (char, statName) {
  const statId = statIds[statName]

  let totalCost = 0
  let currentAmount = char[statId]
  while (currentAmount > 5) {
    totalCost += (cost(currentAmount -1))
    currentAmount -= 1
  }

  return totalCost
}

export function getTotalStats (
  char,
  currentLevel = char.level,
  points = 0
) {
  if (currentLevel === 0) { return points }
  return getTotalStats(
    char,
    currentLevel -1,
    points + currentLevel + 15
  )
}
export function getSpent (char) {
  const stats =
    ['strength', 'constitution', 'reflex', 'accuracy', 'flow']
      .reduce((acc, statName) => acc + getStatSpent(char, statName), 0)
  return stats
}
export function getCurrentStatPoints (char) {
  return getTotalStats(char) - getSpent(char)
}

