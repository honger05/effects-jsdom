import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = 'https://cnodejs.org'

Vue.http.interceptors.push((request, next) => {
  console.log('请求地址：', request.url)
  next(response => {
    console.log('返回数据：', response.data)
  })
})
