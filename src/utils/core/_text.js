
// 文本操作类

import * as Core from './_core'

/**
 * 从文本中提取 @username 标记的用户名数组
 *
 * @param  {String} text 文本类容
 * @return {Array}      用户名数组
 */
export function fetchUsers (text) {
  if (!text) {
    return []
  }

  const ignoreRegexps = [
    /```.+?```/g, // 去除单行的 ```
    /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
    /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
    /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
    /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
    /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
  ]

  ignoreRegexps.forEach(ignoreRegex => {
    text = text.replace(ignoreRegex, '')
  })

  const results = text.match(/@[a-z0-9\-_]+\b/igm)
  let names = []

  results && results.forEach(re => {
    names.push(re.slice(1))
  })

  return Core.uniq(names)
}

/**
 * 让 @username 成为可点击的链接
 *
 * @param  {String} text 文本类容
 * @return {String}      替换后的类容
 */
export function linkUsers (text) {
  var users = fetchUsers(text)
  users.forEach(name => {
    text = text.replace(new RegExp('@' + name + '\\b(?!\\])', 'g'), '[@' + name + '](/user/' + name + ')')
  })
  return text
}
