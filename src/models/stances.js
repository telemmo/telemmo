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
    description: '+100% HP',
    buffs: player => ({
      hp: player.hp * 2,
      maxHp: player.maxHp * 2,
    }),
  },
  {
    name: 'Berserk',
    emoji: ':triumph:',
    classes: ['Fighter'],
    description: '-50% HP, +50% ATK',
    buffs: player => ({
      hp: player.hp / 2,
      maxHp: player.maxHp / 2,
      atk: player.atk * 1.5,
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
    description: '+25% Attack Speed, +25% ATK',
    buffs: player => ({
      aspd: player.aspd * 1.25,
      atk: player.atk * 1.25,
    }),
  },
  {
    name: 'Heretic',
    emoji: ':mortar_board:',
    classes: ['Acolyte'],
    description: '+100% ATK',
    buffs: player => ({
      atk: player.atk *2,
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
    description: '+50% ATK, +25% ASPD',
    buffs: player => ({
      atk: player.atk * 1.5,
      aspd: player.aspd * 1.25,
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
