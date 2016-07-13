
// 核心方法

/**
 * 获取 url 中的参数
 *
 * @param  {String} url 给定的url
 *  e.g. 'http://www.abc.com?key=1&key=2&key=3&test=4#bbb'
 * @param  {String} key 参数
 * @return {unkown}     参数值 , '' , 全部参数对象 , {} , 数组
 */
export function getUrlParam (url, key) {
  let result = {}
  // replace, 第一个参数为 模式匹配，接下来的是 子表达式，再是出现的位置，再是整个字符串
  // match， 形如 /\W+/g 会匹配所有模式，不会匹配子表达式，
  //        形如 /\W+/ 第一个数是全匹配，接下来会把子表达式接在后面
  url.replace(/\??(\w+)=(\w+)&?/g, (a, b, c) => {
    if (result[b] !== void 0) {
      result[b] = [].concat(result[b], c)
    } else {
      result[b] = c
    }
  })
  if (key === void 0) {
    return result
  }
  return result[key] || ''
}

/**
 * 数组去重
 *
 * 输入 [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN]
 * 输出 [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']
 *
 * 重点
 * 1. NaN 是唯一一个 ’不等于自己的‘ a = NaN, a !== a
 * 2. {} !== {} 但是 a = {}, a === a
 * 3. 利用 hash 表的键，会排除掉所有相同的 包括 {} 和 NaN
 * 4. 而利用 数组的 indexOf，就不会排除掉 {} 和 NaN，这样只有再排除掉 NaN 就可以了。
 */
export function uniq (arr) {
  let newArr = []
  let flag = true
  arr.forEach(val => {
    if (newArr.indexOf(val) === -1) {
      if (val !== val) { // 排除 NaN
        if (flag) {
          newArr.push(val)
          flag = false
        }
      } else {
        newArr.push(val)
      }
    }
  })
  return newArr
}

/**
 * rgb 转 16进制
 *
 * @param  {[type]} sRGB [description]
 * @return {[type]}      [description]
 */
export function rgb2hex(sRGB) {
  let regexp = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/
  let ret = sRGB.match(regexp)
  if (!ret) {
    return sRGB
  }
  let str = '#'
  for (let i = 1; i <=3; i++) {
    let m = parseInt(ret[i])
    if (m <= 255 && m >= 0) {
      str = str + (m < 16 ? '0' + m.toString(16) : m.toString(16))
    } else {
      return sRGB
    }
  }
  return str
}

/**
 * 以 - 为分隔符，将第二个起的非空单词首字母转为大写
 * -webkit-border-image 转换后的结果为 webkitBorderImage
 * font-size   fontSize
 *
 * 重点 (?!^) 反向引用，排除字符串开头的 不捕获第一个
 *
 * @param  {[type]} sName [description]
 * @return {[type]}       [description]
 */
export function cssStyle2DomStyle(sName) {
  return sName.replace(/(?!^)\-(\w)(\w+)/g, (a, b, c) => {
    return b.toUpperCase() + c.toLowerCase()
  }).replace(/^\-/, '')
}

/**
 * 大数相加, 把字符串转化成数组再操作     s.charAt(i)
 *
 * parseInt,parseFloat 的作用就是把 1px 转成 1 的作用
 * Number 则把 true = 1， false = 0
 * ~~ 则把 undefined = 0, NaN = 0
 * ~x = -(x + 1)
 *
 * @param {String} a 相加数
 * @param {String} b 相加数
 */
export function addBig (a, b) {
  let res = '',
      c = 0
  a = a.split('')
  b = b.split('')
  while (a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop()
    res = c % 10 + res
    c = c > 9
  }
  return res.replace(/^0+/, '')
}

/**
 * 裴波那契函数  f(n) = f(n-1) + f(n-2), f(1) = 1, f(2) = 1
 *
 * 使用闭包存储中间结果，优化多次调用，空间复杂度 o(n), 时间复杂度 o(n), 最快 o(1)
 *
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
export function fibonacci (n) {
  if (n < 0) {
    return _Fib.clear()
  }
  return _Fib.get(n)[n]
}

// 使用闭包存储中间结果，利于多次调用
var _Fib = (n => {
  let memory = ['0', '1']
  return {
    get (n) {
      for (let i = memory.length; i <= n; i++) {
        memory[i] = memory[i-1] + memory[i-2]
      }
      return memory.slice(0, n + 1)
    },
    clear () {
      memory = ['0', '1']
    }
  }
})()
