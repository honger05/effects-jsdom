
require('../scss/app.scss')
require('bower/animate.css/animate.css')

require('./core/_error')
require('./vue-helper/_vue-transition')

require('./test/_test')

module.exports = {
  Core: require('./core/_core.js'),
  Log: require('./core/_log')
}
