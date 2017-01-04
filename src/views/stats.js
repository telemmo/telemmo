const emoji = require('node-emoji')
const keyboard = require('./keyboards/overworld')
const { getEmoji } = require('../models/gems')
const { getStats } = require('../models/combat')

module.exports = {
  message: player => {
    const combatStats = getStats(player.character)
    return emoji.emojify(`
*Stats*:
${
  ['str', 'vit', 'agi', 'int', 'dex', 'luk']
    .map(stat => `${stat.toUpperCase()}: ${player.character[stat]}\n`)
    .join('')
}
*Combat Stats*:
${
  Object.keys(combatStats)
    .map(stat => {
      const s = Number(combatStats[stat])
      return `${stat}: ${s < 5 ? (s * 100).toFixed(2) + '%' : s}\n`
    })
    .join('')
}
*Gems*:
${
  Object.keys(player.gems)
    .map(gemType => `${getEmoji(gemType)} ${gemType}: ${player.gems[gemType]}\n`)
    .join('')
}

    `.trim())
  },
  error: `You don't have a character, create one at /start`
}
