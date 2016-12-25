const emoji = require('node-emoji')
const { fromName , getAllEmoji } = require('../models/character')
const { stanceDescriptionFromName } = require('../models/stances')

const getStats = clas =>
  `Main Stats: ${clas.mainStats.join(' ').toUpperCase()}`


module.exports = {
  buildMessage: className => {
    const clas = fromName(className)
    return emoji.emojify(`

${clas.emoji} ${className} ${clas.emoji}

${getStats(clas)}

*Stances:* These are combat stances that you can change any time in combat. Different stances casts different skills and gives your character unique passive bonuses.

${clas.stances.map(stanceDescriptionFromName).join('\n\n')}

    `.trim())
  },
  error: `You can't do this :(`
}
