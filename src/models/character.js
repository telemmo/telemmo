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
    },
    {
      name: 'Fighter',
      emoji: ':muscle:',
      mainStats: ['str', 'vit'],
      skills: ['Heal'],
    },
    {
      name: 'Thief',
      emoji: ':hocho:',
      mainStats: ['agi', 'str'],
      skills: ['Double Attack'],
    },
    {
      name: 'Acolyte',
      emoji: ':sparkling_heart:',
      mainStats: ['int', 'dex'],
      skills: ['Heal'],
    },
    {
      name: 'Ranger',
      emoji: ':trident:',
      mainStats: ['dex', 'agi'],
      skills: ['Heal'],
    },
    {
      name: 'Merchant',
      emoji: ':moneybag:',
      mainStats: ['luk', 'dex'],
      skills: ['Luck Strike'],
    },
  ],
}

module.exports = {
  buildCharacter,
  fromName,
  getAllEmoji,
}

function buildCharacter (name) {
  const baseClass = classes.all.find(c => c.name === name)
  return Object.assign(
    {},
    baseClass,
    classes.baseStats,
    {
      exp: 0,
      gold: 0,
    }
  )
}

function fromName (name) {
  const baseClass = classes.all.find(c => c.name === name)
  return baseClass
}

function getAllEmoji () {
  return classes.all.map(c => c.emoji).join(' ')
}

