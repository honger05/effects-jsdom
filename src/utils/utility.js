
require('../scss/app.scss')

require('./core/_error')
require('./vue-helper/_vue-common')

// require('./test/_test')

var Utils = extend({},
  require('./core/_core'),
  require('./core/_check'),
  require('./core/_time'),
  require('./core/_text'),
  require('./core/_animate')
)

module.exports = Utils

/**
 *  扩展函数
 */
function extend () {
  var target = arguments[0] || {}
  var i = 1, options, copy
  var len = arguments.length

  for (; i < len; i++) {
    if ((options = arguments[i]) !== null) {
      for (name in options) {
        copy = options[name]
        if (copy !== void 0) {
          target[name] = copy
        }
      }
    }
  }

  return target
}
