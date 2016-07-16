
// 日期时间操作类

/**
 * 对 Date 的扩展，讲 Date 转化为指定格式的 String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 *
 * @param  {Date} date [日期]
 * @param  {String} fmt  指定格式
 * @return {[type]}      [description]
 */
export function fmtDate (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S': date.getMilliseconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k of o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

/**
 * 从发布到现在的时间
 *
 *  ~~ 按位运算可以把任何数转成 整数。包括：null、undefined
 *
 * @param  {Number} time 发布的时间  单位是 秒
 * @return {[type]}      [description]
 */
export function fromNow (time) {
  const between = Date.now() / 1000 - (new Date(time)).getTime() / 1000
  if (between < 60) {
    return pluralize(between, ' 秒前')
  } else if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟前')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时前')
  } else if (between < 86400 * 30) {
    return pluralize(~~(between / 86400), ' 天前')
  } else if (between < 86400 * 365) {
    return pluralize(~~(between / (86400 * 30)), ' 月前')
  } else {
    return pluralize(~~(between / (86400 * 365)), ' 年前')
  }
}

/**
 * 使其成为复数 比如  minute 变  minutes, 中文就不需要了
 *
 * @param  {[type]} time  [description]
 * @param  {[type]} label [description]
 * @return {[type]}       [description]
 */
function pluralize (time, label) {
  return time + label
}

/**
 * 日期格式化
 *
 * @param  {[type]} d      [description]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
export function formatDate(d, format) {
  let year = d.getFullYear(),
      month = d.getMonth() + 1,
      date = d.getDate(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds(),
      day = d.getDay(),
      week = ['日', '一', '二', '三', '四', '五', '六']
      return format.replace(/yyyy/, year)
                   .replace(/yy/, pad(year % 100))
                   .replace(/MM/, pad(month))
                   .replace(/M/, month)
                   .replace(/dd/, pad(date))
                   .replace(/d/, date)
                   .replace(/HH/, pad(hour))
                   .replace(/H/, hour)
                   .replace(/hh/, pad(hour % 12))
                   .replace(/h/, hour % 12)
                   .replace(/mm/, pad(minute))
                   .replace(/m/, minute)
                   .replace(/ss/, pad(second))
                   .replace(/s/, second)
                   .replace(/w/, week[day])
}

// 补零
function pad(n) {
  return n > 10 ? n : '0' + +n
}
