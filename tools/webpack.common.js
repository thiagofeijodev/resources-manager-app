/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, '..', 'src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
    new webpack.EnvironmentPlugin([]),
    new webpack.DefinePlugin({
      MODE: `'${process.env.MODE}'`,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'components': path.resolve(__dirname, '..', 'src', 'components'),
      'functions': path.resolve(__dirname, '..', 'src', 'functions'),
      'data': path.resolve(__dirname, '..', 'src', 'data'),
      'path': require.resolve('path-browserify'),
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify'),
    },
  },
}
