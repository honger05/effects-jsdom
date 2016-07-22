import 'bower/vux/dist/vux.css'

import Vue from 'vue'
import Router from 'vue-router'
import App from './App'

import Home from './Home'

import Demo from './demos/Demo'
import Pulldown from './demos/Pulldown'

Vue.use(Router)
Vue.config.devtools = true

const router = new Router()

router.map({
  '/': {
    component: Home
  },
  '/demo': {
    component: Demo
  },
  '/demo/pulldown': {
    component: Pulldown
  }
})

router.start(App, '#app')
