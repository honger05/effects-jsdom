
export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: function (resolve) {
        require(['./views/index.vue'], resolve)
      }
    },
    '*': {
      component: function (resolve) {
        require(['./views/index.vue'], resolve)
      }
    },
    '/list': {
      name: 'list',
      component: function (resolve) {
        require(['./views/list.vue'], resolve)
      }
    },
    '/topic/:id': {
      name: 'topic',
      component: function (resolve) {
        require(['./views/topic.vue'], resolve)
      }
    },
    '/add': {
      name: 'add',
      component: function (resolve) {
        require(['./views/new.vue'], resolve)
      },
      auth: true
    },
    '/message': {
      name: 'message',
      component: function (resolve) {
        require(['./views/message.vue'], resolve)
      },
      auth: true
    },
    '/about': {
      name: 'about',
      component: function (resolve) {
        require(['./views/about.vue'], resolve)
      }
    },
    '/login': {
      name: 'login',
      component: function (resolve) {
        require(['./views/login.vue'], resolve)
      }
    },
    '/user/:loginname': {
      name: 'user',
      component: function (resolve) {
        require(['./views/user.vue'], resolve)
      }
    }
  })
}
