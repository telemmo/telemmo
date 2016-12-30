const { classFromName, isValidClass } = require('./classes')

const baseStats = {
  str: 5,
  vit: 5,
  agi: 5,
  luk: 5,
  int: 5,
  dex: 5,
  stance: null,
}

module.exports = {
  buildCharacter,
}

function buildCharacter (className, name) {

  if (!isValidClass(className)) { throw new Error('Invalid Class') }

  return Object.assign(
    {},
    { className, name },
    baseStats
  )
}



