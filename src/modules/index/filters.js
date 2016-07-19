
/**
 * 格式化时间
 *
 * @param  {String} time     需要格式化的时间
 * @param  {Bool} friendly 是否是 fromNow
 * @return {String}
 */
export function getLastTimeStr (time, friendly) {
  if (!time) {
    return
  }
  if (friendly) {
    return Utils.fromNow(time)
  }
  return Utils.formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
}

/**
 * 获取文字标签
 *
 * @param  {String} tab  Tab 分类
 * @param  {Bool} good 是否是精华帖
 * @param  {Bool} top  是否是置顶帖
 * @return {String}      [description]
 */
export function getTabStr (tab, good, top) {
  let str = ''
  if (top) {
    str = '置顶'
  } else if (good) {
    str = '精华'
  } else {
    switch (tab) {
      case 'share':
        str = '分享'
        break
      case 'ask':
        str = '问答'
        break
      case 'job':
        str = '招聘'
        break
      default:
        str = '暂无'
        break
    }
  }
  return str
}

/**
 *  获取标签样式
 *
 * @param  {String} tab  Tab 分类
 * @param  {Bool} good 是否是精华帖
 * @param  {Bool} top  是否是置顶帖
 * @return {String}      [description]
 */
export function getTabClassName (tab, good, top) {
  let className = ''
  if (top) {
    className = 'top'
  } else if (good) {
    className = 'good'
  } else {
    switch (tab) {
      case 'share':
        className = 'share'
        break
      case 'ask':
        className = 'ask'
        break
      case 'job':
        className = 'job'
        break
      default:
        className = 'default'
        break
    }
  }
  return className
}

/**
 *  获取 title 文字
 *
 * @param  {String} tab Tab 分类
 */
export function getTitleStr (tab) {
  let str = ''
  switch (tab) {
    case 'share':
      str = '分享'
      break
    case 'ask':
      str = '问答'
      break
    case 'job':
      str = '招聘'
      break
    case 'good':
      str = '精华'
      break
    default:
      str = '全部'
      break
  }
  return str
}
