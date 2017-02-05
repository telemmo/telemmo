const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { merge, objOf } = require('ramda')

const package = require('./package.json')

const externals = fs.readdirSync('node_modules')
  .filter(module => module !== '.bin')
  .reduce((modules, module) =>
      merge(modules, objOf(module, `commonjs ${module}`)), {})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'telemmo.js',
  },
  target: 'node',
  devtool: 'source-map',
  externals,
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        loaders: [
          'gettext',
          'babel',
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(package.version),
    }),
  ],
}

