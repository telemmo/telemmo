const emoji = require('node-emoji')
const keyboard = require('./keyboards/overworld')

module.exports = {
  keyboard,
  message: emoji.emojify(`
Character created. Have fun!

:globe_with_meridians: Welcome to the overworld! :globe_with_meridians:

\`Dev notes:\`
:no_entry_sign: = Not implemented yet :(
:no_entry_sign: Merchant Gambler Stance
Check the subreddit for information or feedback: https://www.reddit.com/r/telemmo

  `.trim()),
  error: 'You already have a character :)'
}
