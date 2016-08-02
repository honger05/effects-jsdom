var path = require('path')
var mock = true

module.exports = {
  baseUrl: mock ? 'http://localhost' : 'https://cnodejs.org',
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist-un'),
    assetsSubDirectory: 'static',
    // assetsSubDirectory: 'vuecnode/static',
    assetsPublicPath: '/',
    productionSourceMap: false
  },
  dev: {
    port: 3000,
    proxyTable: {}
  }
}
