const emoji = require('node-emoji')
const recipes = require('../models/recipes')
const { getEmoji } = require('../models/gems')

const e = ':arrow_up_small:'

module.exports = {
  keyboard: (statName) => ({
    reply_markup: {
      keyboard: [
        [`${e} ${statName.toUpperCase()} +2`,
        `:no_entry_sign: ${e} ${statName.toUpperCase()} +5`,
        `:no_entry_sign: ${e} ${statName.toUpperCase()} +10`],
        ['Stats :confetti_ball:', 'Back to overworld :globe_with_meridians:', 'My Stats :part_alternation_mark:']
      ].map(row => row.map(key => emoji.emojify(key)))
    }
  }),
  message: emoji.emojify(`
Upgrades cost:

+2 points:${recipes.stats[2].map(gem => `\n${getEmoji(gem.name)}: ${gem.amount}`).join('')}
  `.trim()),
  error: `You don't have a character, create one at /start`
}
