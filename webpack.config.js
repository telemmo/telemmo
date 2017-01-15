const fs = require('fs')
const { merge, objOf } = require('ramda')

const externals = fs.readdirSync('node_modules')
  .filter(module => module !== '.bin')
  .reduce((modules, module) =>
      merge(modules, objOf(module, `commonjs ${module}`)), {})

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'build.js',
  },
  target: 'node',
  externals,
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
}

