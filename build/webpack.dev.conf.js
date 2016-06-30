var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var conf = {
  entry: {},
  module: {
    loaders: utils.styleLoaders()
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: utils.assetsPath('js/common.js'),
      chunks: utils.entry
    })
  ]
}

utils.entry.forEach(function(item) {
  conf.entry[item] = 'src/modules/'+ item +'/'+ item +'.js'

  conf.plugins.push(new HtmlWebpackPlugin({
    scope: item,
    filename: item + '.html',
    template: 'src/modules/'+ item +'/' + item + '.html',
    inject: 'body',
    chunks: [ item ]
  }))
})

// add hot-reload related code to entry chunks
Object.keys(conf.entry).forEach(function (name) {
  conf.entry[name] = ['./build/dev-client'].concat(conf.entry[name])
})

module.exports = merge(baseWebpackConfig, conf)
