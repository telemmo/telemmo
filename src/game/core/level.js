import {
  pipe,
  reduce,
  concat,
  always,
} from 'ramda'

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
  if (fighterLvl >= 100) {
    return null
  }
  const nextLevel = fighterLvl + 1
  const fullExpLevel = expTable[fighterLvl]
  const fullExpNextLevel = expTable[nextLevel]
  return 1 - (fullExpNextLevel - fighter.exp) / (fullExpNextLevel - fullExpLevel)
}

export function buildExpBar (percentage, size = 10) {
  if (percentage === null) {
    return 'Max level.'
  }
  const nFilled = Math.floor(percentage * size)
  const nEmpty = size - nFilled - 1
  const smallBars = Array.from(' ▏▎▍▌▋▊▉')
  const delimiter = '|'
  return [
    `${(percentage * 100).toFixed(2)}%`,
    [
      delimiter,
      reduce(concat, [], [
        Array.from({ length: nFilled }, always('█')),
        [smallBars[Math.floor((percentage*size - nFilled)*8)]],
        Array.from({ length: nEmpty },  always(' ')),
      ]).join(''),
      delimiter,
    ].join(''),
  ].join(' ')
}

export const nextLevelBar = pipe(
  percentageToNextLevel,
  buildExpBar,
)
