const emoji = require('node-emoji')

const stances = [
  {
    name: 'Arcane',
    emoji: ':stars:',
    classes: ['Mage'],
    description: 'Doubles skill casting chance',
    buffs: player => ({
      skillCast: player.skillCast * 2
    }),
  },
  {
    name: 'Debuff',
    emoji: ':hotsprings:',
    classes: ['Mage'],
    description: '+20% chance to stun, slow or silence on every attack',
    buffs: player => ({
      stunChance: player.stunChance + 0.20,
      slowChance: player.slowChance + 0.20,
      silenceChance: player.silenceChance + 0.20,
    }),
  },
  {
    name: 'Tank',
    emoji: ':tractor:',
    classes: ['Fighter'],
    description: '+100% VIT',
    buffs: player => ({
      vit: player.vit * 2
    }),
  },
  {
    name: 'Berserk',
    emoji: ':triumph:',
    classes: ['Fighter'],
    description: '-75% VIT, All VIT removed goes to AGI',
    buffs: player => ({
      vit: player.vit - Math.floor(player.vit * 0.75),
      agi: player.agi + Math.floor(player.vit * 0.75)
    }),
  },
  {
    name: 'Loot',
    emoji: ':moneybag:',
    classes: ['Thief'],
    description: 'Doubles monster drop ratio',
    buffs: player => ({
      dropRatio: player.dropRatio * 2,
    }),
  },
  {
    name: 'Stealth',
    emoji: ':ghost:',
    classes: ['Thief'],
    description: '+25% AGI, +25% DEX',
    buffs: player => ({
      agi: player.agi + player.agi * 0.25,
      dex: player.dex + player.dex * 0.25,
    }),
  },
  {
    name: 'Heretic',
    emoji: ':mortar_board:',
    classes: ['Acolyte'],
    description: '-100% INT, all INT removed is split between STR and AGI',
    buffs: player => ({
      int: 0,
      str: player.str + Math.floor(player.int/2),
      agi: player.agi + Math.floor(player.int/2),
    }),
  },
  {
    name: 'Priest',
    emoji: ':church:',
    classes: ['Acolyte'],
    description: 'Doubles skill casting chance',
    buffs: player => ({
      skillCast: player.skillCast * 2
    }),
  },
  {
    name: 'Sniper',
    emoji: ':eight_pointed_black_star:',
    classes: ['Ranger'],
    description: '+50% DEX, +25% AGI',
    buffs: player => ({
      agi: player.agi + player.agi * 0.25,
      dex: player.dex + player.dex * 0.50,
    }),
  },
  {
    name: 'Trapper',
    emoji: ':fishing_pole_and_fish:',
    classes: ['Ranger'],
    description: '+400% dodge chance',
    buffs: player => ({
      dodge: player.dodge * 4
    }),
  },
  {
    name: 'Gambler',
    emoji: ':flower_playing_cards:',
    classes: ['Merchant'],
    description: 'Wild RNG! All damage is multiplied by a random number between 0 and 4',
    buffs: player => ({
      wildRngDamage: true
    }),
  },
  {
    name: 'Breaker',
    emoji: ':eight_spoked_asterisk:',
    classes: ['Merchant'],
    description: '+25% stun chance on every attack.',
    buffs: player => ({
      stunChance: player.stunChance + 0.25
    }),
  },
]

module.exports = {
  stanceDescriptionFromName,
  stanceFromName,
}

function stanceDescriptionFromName (name) {
  const stance = stances.find(stance => stance.name === name)
  if (!stance) { return }
  return emoji.emojify(`${stance.emoji} ${name}: ${stance.description}`)
}

function stanceFromName (name) {
  const stance = stances.find(stance => stance.name === name)
  return stance
}
