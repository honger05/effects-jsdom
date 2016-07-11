
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import FastClick from 'fastclick'
import * as filters from './filters'
import routerMap from './routers'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
})

router.beforeEach(transition => {
  FastClick.attach(document.body)

  console.log(transition)

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

let app = Vue.extend({})

routerMap(router)

router.start(app, '#app')
