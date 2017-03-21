import {
  values,
} from 'ramda'

export const statIds = {
  strength: 'str',
  constitution: 'con',
  reflex: 'ref',
  accuracy: 'acc',
  flow: 'flow',
}

export function statUpgradeCost (currentStatScore, amountToIncrease = 1) {
  if (amountToIncrease <= 0) { return 0 }
  const upgradeCost = (
    currentStatScore < 5
    ? 0
    : 5 + (5 * Math.floor(currentStatScore / 8))
  )

  return upgradeCost + statUpgradeCost(currentStatScore + 1, amountToIncrease - 1)
}

export function affordableUpgrades (currentStatScore, availablePoints) {
  const upgradeCost = statUpgradeCost(currentStatScore)
  if (availablePoints < upgradeCost) { return 0 }

  return 1 + affordableUpgrades(
    currentStatScore + 1,
    availablePoints - upgradeCost,
  )
}

export function statDowngradeRefund (currentStatScore, amountToDecrease = 1) {
  return statUpgradeCost(currentStatScore - amountToDecrease, amountToDecrease)
}

export function statPointsSpent (statScore) {
  return statUpgradeCost(0, statScore)
}

export function totalStatPoints (charLevel) {
  if (charLevel <= 0) { return 0 }
  return charLevel + 15 + totalStatPoints(charLevel - 1)
}

export function totalStatPointsSpent (char) {
  return values(statIds).reduce(
    (acc, statId) => acc + statPointsSpent(char[statId]),
    0,
  )
}

export function unspentStatPoints (char) {
  return totalStatPoints(char.level) - totalStatPointsSpent(char)
}

