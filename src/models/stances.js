const stances = [
  {
    name: 'Arcane',
    classes: ['Mage'],
    description: '+100% skill casting chance'
  },
  {
    name: 'Debuff',
    classes: ['Mage'],
    description: '25% stun chance on every attack.'
  },
  {
    name: 'Tank',
    classes: ['Fighter'],
    description: '+100% total VIT'
  },
  {
    name: 'Berserk',
    classes: ['Fighter'],
    description: '-75% VIT, All VIT removed goes to AGI'
  },
  {
    name: 'Loot',
    classes: ['Thief'],
    description: '+100% drop chances'
  },
  {
    name: 'Stealth',
    classes: ['Thief'],
    description: '+25% AGI, +25% DEX'
  },
  {
    name: 'Heretic',
    classes: ['Acolyte'],
    description: '-100% INT, all INT removed is split between STR and AGI'
  },
  {
    name: 'Priest',
    classes: ['Acolyte'],
    description: '+100% Heals and buffs casting chance'
  },
  {
    name: 'Sniper',
    classes: ['Ranger'],
    description: '+50% DEX, +25% AGI'
  },
  {
    name: 'Trapper',
    classes: ['Ranger'],
    description: '+400% dodge chance'
  },
  {
    name: 'Gambler',
    classes: ['Merchant'],
    description: 'Wild RNG! All damage is multiplied by a random number between 0 and 4'
  },
  {
    name: 'Breaker',
    classes: ['Merchant'],
    description: '+20% chance to stun, slow or silence on every attack'
  },
]

module.exports = {
  stanceDescriptionFromName
}

function stanceDescriptionFromName (name) {
  return name + ': ' + stances.find(stance => stance.name === name).description
}
