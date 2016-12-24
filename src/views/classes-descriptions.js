const emoji = require('node-emoji')
const { fromName , getAllEmoji } = require('../models/character')

const getStats = cName =>
  `Main Stats: ${fromName(cName).mainStats.join(' ').toUpperCase()}`


module.exports = {
  buildMessage: className => emoji.emojify(`

${fromName(className).emoji} ${className} ${fromName(className).emoji}

${getStats(className)}

  `.trim()),
  error: `You can't do this :(`
}
