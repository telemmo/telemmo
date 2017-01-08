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
    description: '+30% chance to stun',
    buffs: player => ({
      stunChance: player.stunChance + 0.30,
    }),
  },
  {
    name: 'Tank',
    emoji: ':tractor:',
    classes: ['Fighter'],
    description: '+70% HP',
    buffs: player => ({
      hp: Math.floor(player.hp * 1.70),
      maxHp: Math.floor(player.maxHp * 1.70),
    }),
  },
  {
    name: 'Berserk',
    emoji: ':triumph:',
    classes: ['Fighter'],
    description: '-75% HP, +100% ATK, +50% Attack Speed',
    buffs: player => ({
      hp: Math.floor(player.hp * 0.25),
      maxHp: Math.floor(player.maxHp * 0.25),
      atk: player.atk * 2,
      aspd: player.aspd * 1.5,
    }),
  },
  {
    name: 'Loot',
    emoji: ':moneybag:',
    classes: ['Thief'],
    description: '+50% monster drop ratio',
    buffs: player => ({
      dropRatio: player.dropRatio * 1.5,
    }),
  },
  {
    name: 'Stealth',
    emoji: ':ghost:',
    classes: ['Thief'],
    description: '+35% Attack Speed, +35% ATK, +10% dodge',
    buffs: player => ({
      aspd: player.aspd * 1.35,
      atk: player.atk * 1.35,
      dodge: player.dodge * 1.1,
    }),
  },
  {
    name: 'Heretic',
    emoji: ':mortar_board:',
    classes: ['Acolyte'],
    description: '+70% ATK',
    buffs: player => ({
      atk: player.atk * 1.7,
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
    description: '+30% ATK, +40% Attack Speed',
    buffs: player => ({
      atk: player.atk * 1.3,
      aspd: player.aspd * 1.4,
    }),
  },
  {
    name: 'Trapper',
    emoji: ':fishing_pole_and_fish:',
    classes: ['Ranger'],
    description: '4x dodge chance',
    buffs: player => ({
      dodge: player.dodge * 4
    }),
  },
  {
    name: 'Efficient',
    emoji: ':flower_playing_cards:',
    classes: ['Merchant'],
    description: '+30% monster drop ratio, +20% ATK, +20% dodge',
    buffs: player => ({
      dropRatio: player.dropRatio * 1.3,
      dex: player.dex * 1.2,
      luk: player.luk * 1.2,
    }),
  },
  {
    name: 'Breaker',
    emoji: ':eight_spoked_asterisk:',
    classes: ['Merchant'],
    description: '+30% ATK, +20% chance to stun.',
    buffs: player => ({
      atk: player.atk * 1.3,
      stunChance: player.stunChance + 0.20,
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
