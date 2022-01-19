/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/scripts/test.js
https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/scripts/start.js
https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/scripts/build.js
https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/config/webpack.config.js
*/

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.join(__dirname, '..', 'src/index.js'),
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin([
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'public/index.html'),
      filename: path.join(__dirname, '..', 'dist/index.html'),
    }),
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
  devServer: {
    port: 3001,
    static: path.join(__dirname, '..', 'public'),
    historyApiFallback: true,
    host: '0.0.0.0',
  },
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
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
}
