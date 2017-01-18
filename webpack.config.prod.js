const webpack = require('webpack')
const config = require('./webpack.config.js')

const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"production"',
})

config.plugins.push(definePlugin)

module.exports = config
