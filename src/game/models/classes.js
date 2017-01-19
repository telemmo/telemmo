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

export default function find (name) {
  return classes.find(clas => clas.name === name)
}
