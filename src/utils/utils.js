
require('../scss/app.scss')
require('bower/animate.css/animate.css')

require('./core/_error')
require('./vue-helper/_vue-common')

// require('./test/_test')

let Utils = extend({},
  require('./core/_core'),
  require('./core/_check'),
  require('./core/_time'),
  require('./core/_text')
)

module.exports = Utils

/**
 *  扩展函数
 */
function extend () {
  let target = arguments[0] || {}
  let i = 1, options, copy
  let len = arguments.length

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
