var path = require('path');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';
var port = process.env.PORT || 3000;
var webpackHost = process.env.WEBPACK_HOST || 'localhost';
var devtool;
var entry = ['./src/index'];
var loaders = ['babel'];
var plugins = [];

if (!isProd) {
  entry.concat([
    'webpack-dev-server/client?http://' + webpackHost + ':' + port,
    'webpack/hot/only-dev-server'
  ]);
  loaders.concat([
    'react-hot'
  ]);
  plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]);
  devtool = 'eval';
} else {
  plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin()
  ]);
}

module.exports = {
  devtool: devtool,
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: loaders,
      include: path.join(__dirname, 'src')
    }]
  }
};
