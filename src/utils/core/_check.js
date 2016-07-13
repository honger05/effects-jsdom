
// 正则表达式验证类

/**
 * Email 验证
 *
 * @param  {[type]}  email [description]
 * @return {Boolean}       [description]
 */
export function checkEmail (email) {
  var regexp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  return regexp.test(email)
}

export function checkPhone (phone) {
  var regexp = /^1\d{10}$/
  return regexp.test(phone)
}
