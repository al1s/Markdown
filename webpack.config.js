const path = require('path');
const webpack = require('webpack');

const config = {
  mode: 'development',
  context: __dirname,
  devtool: process.env.NODE_ENV == 'production'
    ? false
    : 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    // hot: true,
    publicPath: '/',
    // public: 'localhost:8080',
    historyApiFallback: true,
    host: 'localhost',
    port: 8080
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'webpack-module-hot-accept',
        exclude: /node_modules/
      }
    ]
  }
};

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  config.entry = './src/js/ClientApp.jsx';
  config.devtool = false;
  config.plugins = [];
  config.plugins = config.plugins.concat([
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]);
} else {
  config.entry = [
    'webpack-hot-middleware/client?http://localhost:8080',
    './src/js/index.jsx'
  ],
  config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];
}

module.exports = config;
