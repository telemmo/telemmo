const { classFromName, isValidClass } = require('./classes')

const baseStats = {
  str: 1,
  vit: 1,
  agi: 1,
  luk: 1,
  int: 1,
  dex: 1,
}

module.exports = {
  buildCharacter,
}

function buildCharacter (className) {

  if (!isValidClass(className)) { throw new Error('Invalid Class') }

  return Object.assign(
    {},
    { className },
    baseStats
  )
}



