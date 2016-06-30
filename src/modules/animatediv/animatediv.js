require('./animatediv.scss')

let container = document.getElementById('container')
let btn = document.getElementById('btn')

btn.onclick = function () {
  if (container.offsetLeft === 0) {
    move(container, 'left', -200)
  } else {
    move(container, 'left', 0)
  }
}

let timer = null

function move (obj, attr, target, fn) {
  clearInterval(timer)
  timer = setInterval(() => {
    var speed = (target - getStyle(obj, attr)) / 10
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
    if (getStyle(obj, attr) === target) {
      clearInterval(timer)
      fn && fn()
    } else {
      obj.style[attr] = (getStyle(obj, attr) + speed) + 'px'
      console.log(obj.style[attr])
    }
  }, 30)
}

function getStyle (obj, attr) {
  if (obj.currentStyle) {
    return parseFloat(obj.currentStyle[attr])
  }
  return parseFloat(getComputedStyle(obj, false)[attr])
}
