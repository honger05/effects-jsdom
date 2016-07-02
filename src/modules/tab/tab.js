require('./tab.scss')

let timer = null
let menu = document.getElementById('menu')
let modContent = document.getElementById('modContent')
let lis = menu.getElementsByTagName('li')
var mod = modContent.getElementsByTagName('div')

for (let i = 0; i < lis.length; i++) {
  lis[i].index = i
  lis[i].onmouseover = function () {
    clearInterval(timer)
    showTab(this)
  }
  lis[i].onmouseout = function () {
    autoPlay(this.index)
  }
}

autoPlay(0)

/**
 * 自动播放
 *
 * @param  {Number} index 从第几个开始自动播放
 */
function autoPlay (index) {
  clearInterval(timer)
  timer = setInterval(() => {
    showTab(lis[index])
    index = index + 1
    if (index >= lis.length) {
      index = 0
    }
  }, 2000)
}

/**
 * 显示页
 *
 * @param  {Element} _this 要显示的元素
 */
function showTab (_this) {
  for (let i = 0; i < lis.length; i++) {
    lis[i].className = ''
    mod[i].style.display = 'none'
  }
  _this.className = 'select'
  mod[_this.index].style.display = 'block'
}

/**
 * ========================
 * 轮播图片
 */

let select = 0
let animateTimer = null
let autoTimer = null
let pic = document.getElementById('pic')
let indicate = document.getElementById('indicate')
let img = pic.getElementsByTagName('li')
let indicates = indicate.getElementsByTagName('a')

for (let i = 0; i < img.length; i++) {
  img[i].index = i
  indicates[i].index = i
  indicates[i].onmouseover = function () {
    clearInterval(autoTimer)
    play(this.index)
  }
  indicates[i].onmouseout = function () {
    auto(this.index)
  }
}

auto(1)

function auto (start) {
  clearInterval(autoTimer)
  autoTimer = setInterval(() => {
    play(start++)
    if (start === img.length) {
      start = 0
    }
  }, 3000)
}

function play (i) {
  clearInterval(animateTimer)
  let target = -i * 490
  indicates[select].className = ''
  select = i
  indicates[select].className = 'active'
  animateTimer = setInterval(() => {
    let speed = (target - pic.offsetLeft) / 10
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
    if (pic.offsetLeft === target) {
      clearInterval(animateTimer)
    }
    pic.style.left = pic.offsetLeft + speed + 'px'
  }, 20)
}
