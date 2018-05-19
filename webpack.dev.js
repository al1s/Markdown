const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonCfg = require('./webpack.common.js');

const config = merge(commonCfg, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    host: 'localhost',
    port: 8080
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  entry: [
    'webpack-hot-middleware/client?http://localhost:8080',
    './src/js/index.jsx'
  ],
  module: { 
    rules: [
        {
          test: /\.jsx?$/,
          loader: 'webpack-module-hot-accept',
          exclude: /node_modules/
        }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});




module.exports = config;

