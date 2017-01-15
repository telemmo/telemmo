module.exports = {
  entry: './src/index.js',
  output: { path: __dirname, filename: 'build.js' },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        loader: 'babel?presets=es2015',
      },
    ],
  }
}
