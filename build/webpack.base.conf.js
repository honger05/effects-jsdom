var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var bowerRoot = path.resolve(__dirname, '../src/bower_components/')
var utilsRoot = path.resolve(__dirname, '../src/utils/')
var precss = require('precss')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    common: ['utils']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'demos': path.resolve(__dirname, '../src/demos'),
      'tmpl': path.resolve(__dirname, '../src/tmpl'),
      'utils': path.resolve(__dirname, '../src/utils/utility'),
      'lib': path.resolve(__dirname, '../src/utils/lib'),
      'bower': path.resolve(__dirname, '../src/bower_components'),
      'animate': path.resolve(bowerRoot, 'animate.css-scss'),
      'vuxcpt': path.resolve(bowerRoot, 'vux/dist/components-commonjs'),
      'vue-router': path.resolve(bowerRoot, 'vue-router/dist/vue-router'),
      'vue-resource': path.resolve(bowerRoot, 'vue-resource/dist/vue-resource'),
      'vue-validator': path.resolve(bowerRoot, 'vue-validator/dist/vue-validator'),
      'fastclick': path.resolve(bowerRoot, 'fastclick/lib/fastclick'),
      'markdown-js': path.resolve(bowerRoot, 'markdown-js/dist/markdown.min')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: [/node_modules/, bowerRoot, utilsRoot]
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      // {
      //   test: /\.html$/,
      //   loader: 'vue-html'
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: path.resolve(__dirname, '../src/utils/utility'),
        loader: 'expose?Utils'
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  postcss: function () {
    return [precss, autoprefixer]
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
