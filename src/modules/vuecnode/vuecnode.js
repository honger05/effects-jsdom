import './assets/icomoon/style.css'
import './assets/scss/CV.scss'
import './assets/scss/github-markdown.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import * as filters from './filters'
import routerMap from './routers'

Vue.use(VueRouter)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
})

router.beforeEach(transition => {
  FastClick.attach(document.body)

  if (transition.to.auth) {
    if (localStorage.userId) {
      transition.next()
    } else {
      var redirect = encodeURIComponent(transition.to.path)
      transition.redirect('/login?redirect=' + redirect)
    }
  } else {
    transition.next()
  }
})

router.afterEach(transition => {
  console.log('成功浏览到: ' + transition.to.path)
})

let app = Vue.extend({})

routerMap(router)

router.start(app, '#app')
