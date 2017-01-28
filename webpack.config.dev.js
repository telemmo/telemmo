const config = require('./webpack.config.js')
const WebpackShellPlugin = require('webpack-shell-plugin')

config.output.filename = 'telemmo.dev.js'
config.plugins.push(new WebpackShellPlugin({
  onBuildExit: [
    'node dist/telemmo.dev.js',
  ],
}))

module.exports = config
