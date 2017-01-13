const emoji = require('node-emoji')
const recipes = require('../models/recipes')
const { getEmoji } = require('../models/gems')

const e = ':arrow_up_small:'

module.exports = {
  keyboard: (statName) => ({
    reply_markup: {
      keyboard: [
        [
          `${e} ${statName.toUpperCase()} +1`,
          `${e} ${statName.toUpperCase()} +5`,
          `${e} ${statName.toUpperCase()} +10`,
          `${e} ${statName.toUpperCase()} +1000`,
        ],
        ['Stats :confetti_ball:', 'Back to overworld :globe_with_meridians:', 'My Stats :part_alternation_mark:']
      ].map(row => row.map(key => emoji.emojify(key)))
    }
  }),
  message: emoji.emojify(`
Upgrades cost:

+1 point:${recipes.stats[1].map(gem => `\n${getEmoji(gem.name)}: ${gem.amount}`).join('')}

+5 points:${recipes.stats[5].map(gem => `\n${getEmoji(gem.name)}: ${gem.amount}`).join('')}

+10 points:${recipes.stats[10].map(gem => `\n${getEmoji(gem.name)}: ${gem.amount}`).join('')}

+1000 points:${recipes.stats[1000].map(gem => `\n${getEmoji(gem.name)}: ${gem.amount}`).join('')}
  `.trim()),
  error: `You don't have a character, create one at /start`
}
