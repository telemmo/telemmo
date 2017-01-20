import {
  toLower
} from 'ramda'

const classes = [
  {
    name: 'Mage',
    emoji: ':crystal_ball:',
    stances: ['Arcane', 'Debuff'],
  },
  {
    name: 'Fighter',
    emoji: ':muscle:',
    stances: ['Tank', 'Berserk'],
  },
  {
    name: 'Thief',
    emoji: ':hocho:',
    stances: ['Loot', 'Stealth'],
  },
  {
    name: 'Acolyte',
    emoji: ':sparkling_heart:',
    stances: ['Heretic', 'Priest'],
  },
  {
    name: 'Ranger',
    emoji: ':trident:',
    stances: ['Sniper', 'Trapper'],
  },
  {
    name: 'Merchant',
    emoji: ':moneybag:',
    stances: ['Efficient', 'Breaker'],
  },
]

function find (name) {
  return classes.find(clas => toLower(clas.name) === toLower(name))
}

function all () {
  return classes
}

export default {
  find,
  all,
}
