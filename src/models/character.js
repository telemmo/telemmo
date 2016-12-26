const { gems } = require('./gems')

const classes = {
  baseStats: {
    str: 1,
    vit: 1,
    agi: 1,
    luk: 1,
    int: 1,
    dex: 1,
  },
  all: [
    {
      name: 'Mage',
      emoji: ':crystal_ball:',
      mainStats: ['int', 'dex'],
      skills: ['Fireball'],
      stances: ['Arcane', 'Debuff'],
    },
    {
      name: 'Fighter',
      emoji: ':muscle:',
      mainStats: ['str', 'vit'],
      stances: ['Tank', 'Berserk'],
    },
    {
      name: 'Thief',
      emoji: ':hocho:',
      mainStats: ['agi', 'str'],
      stances: ['Loot', 'Stealth'],
    },
    {
      name: 'Acolyte',
      emoji: ':sparkling_heart:',
      mainStats: ['int', 'dex'],
      stances: ['Heretic', 'Priest']
    },
    {
      name: 'Ranger',
      emoji: ':trident:',
      mainStats: ['dex', 'agi'],
      stances: ['Sniper', 'Trapper'],
    },
    {
      name: 'Merchant',
      emoji: ':moneybag:',
      mainStats: ['luk', 'dex'],
      stances: ['Gambler', 'Breaker'],
    },
  ],
}

module.exports = {
  buildCharacter,
  classFromName,
  getAllEmoji,
}

function buildCharacter (name) {
  const baseClass = classes.all.find(c => c.name === name)
  return Object.assign(
    {},
    baseClass,
    classes.baseStats
  )
}

function classFromName (name) {
  const baseClass = classes.all.find(c => c.name === name)
  return baseClass
}

function getAllEmoji () {
  return classes.all.map(c => c.emoji).join(' ')
}

