const emoji = require('node-emoji')
const { classFromName , getAllEmoji } = require('../models/classes')
const { stanceDescriptionFromName } = require('../models/stances')

const getStats = clas =>
  `Main Stats: ${clas.mainStats.join(' ').toUpperCase()}`

module.exports = {
  buildOptions: className => {
    return {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'I want this class',
              callback_data: JSON.stringify({
                route: 'Create character',
                payload: className
              }),
            }
          ]
        ]
      },
      parse_mode: 'Markdown'
    }
  },
  buildMessage: className => {
    const clas = classFromName(className)
    return emoji.emojify(`

${clas.classEmoji} ${className} ${clas.classEmoji}

${getStats(clas)}

*Stances:* These are combat stances that you can change any time in combat. Different stances casts different skills and gives your character unique passive bonuses.

${clas.stances.map(stanceDescriptionFromName).join('\n\n')}

    `.trim())
  },
  error: `You can't do this :(`
}
