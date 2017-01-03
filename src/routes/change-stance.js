const { classHasStance } = require('../models/classes')
const { stanceFromName } = require('../models/stances')
const persistence = require('../persistence')
const { playerFromId } = persistence.player

function handler (bot, msg, match) {
  const $player = playerFromId(msg.from.id)
  $player.isRegistered()
    .then(() => $player.get())
    .then((player) => {
      // vvvvvvv this is shitty
      stanceName = match[1].split(' ')[0]
      // ^^^^^^^ really shitty
      if (!classHasStance(player.character.className, stanceName)) {
        throw new Error('Invalid Stance')
      }
      $player.changeStance(stanceName)
      bot.sendMessage(msg.chat.id, `Stance changed to ${match[1]}\n\n${stanceFromName(stanceName).description}`)
    })
    .catch((e) => {
      console.log(e)
      bot.sendMessage(msg.chat.id, 'Invalid Stance.')
    })
}

module.exports = {
  message: /Stance: (.*)/,
  handler,
}
