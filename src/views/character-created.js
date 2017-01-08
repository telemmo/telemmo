const emoji = require('node-emoji')
const keyboard = require('./keyboards/overworld')

module.exports = {
  keyboard,
  message: emoji.emojify(`
Character created. Have fun!

:globe_with_meridians: Welcome to the overworld! :globe_with_meridians:

\`Dev notes:\`
:no_entry_sign: = Not implemented yet :(

Check the subreddit for information or feedback: https://www.reddit.com/r/telemmo

Chat group: https://t.me/joinchat/AAAAAApF7BYJ4FpMQ5r0nA

  `.trim()),
  error: 'You already have a character :)'
}
