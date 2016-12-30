const fs = require('fs')
const path = require('path')

const logs = {
  listenMessages,
  registerLog
}

module.exports = logs

function listenMessages (bot) {
  bot.on('message', (msg) => {
    registerLog(msg.from.username, msg)
  })
}

function registerLog (username, payload) {
  const timestamp = Date.now()
  const log = {
    username,
    timestamp,
    payload,
  }
  fs.appendFile(
    path.join(__dirname, `/user-logs/all.txt`),
    `${JSON.stringify(log, null, 2)},`
  )
}
