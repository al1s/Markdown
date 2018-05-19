const merge = require('webpack-merge');
const webpack = require('webpack');
const commonCfg = require('./webpack.common.js');

const config = merge(commonCfg, {
  mode: 'production',
  entry: './src/js/index.jsx',
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
});

module.exports = config;

