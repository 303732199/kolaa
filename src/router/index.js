import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      }
    },
    {
      path: '/tk',
      name: 'tk',
      component: function (resolve) {
        require(['../components/tk.vue'], resolve)
      }
    },
    {
      path: '/bbs',
      name: 'bbs',
      component: function (resolve) {
        require(['../components/bbs.vue'], resolve)
      }
    },
    {
      path: '/mycourse',
      name: 'mycourse',
      component: function (resolve) {
        require(['../components/mycourse.vue'], resolve)
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: function (resolve) {
        require(['../components/profile.vue'], resolve)
      },
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      }
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: function (resolve) {
        require(['../components/resetpassword.vue'], resolve)
      },
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      }
    },
    {
      path: '/blindemail',
      name: 'blindemail',
      component: function (resolve) {
        require(['../components/blindemail.vue'], resolve)
      },
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['../components/login.vue'], resolve)
      }
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      component: function (resolve) {
        require(['../components/forgetpwd.vue'], resolve)
      }
    }
  ]
})
