const fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const logs = eval('[' + require('./all.txt')  + ']')
console.log('total logs:', logs.length)
console.log('accounts:', logs.reduce((acc, log) => {
  if (acc.indexOf(log.payload.from.id) === -1) {
    return [...acc, log.payload.from.id]
  }
  return acc
}, []).length)
