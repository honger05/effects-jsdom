require('bower/vux/dist/vux.css')

import Vue from 'vue'
import Router from 'vue-router'
import App from './App'

import Home from './Home'

import Hello from 'components/Hello'

import Demo from 'pages/Demo'
import Pulldown from 'pages/Pulldown'

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
