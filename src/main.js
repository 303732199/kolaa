// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import {sync} from 'vuex-router-sync'
import router from './router'
import store from './store'
import {WechatPlugin, AjaxPlugin, AlertPlugin, ToastPlugin, cookie} from 'vux'

require('es6-promise').polyfill()
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
FastClick.attach(document.body)
Vue.config.productionTip = false
sync(store, router)
const wx = Vue.wechat
const host = 'http://192.168.1.8/'
Vue.http.defaults.baseURL = host
if (process.env.NODE_ENV === 'development') {
  wx.ready(() => {
    alert('wechat ready')
    wx.onMenuShareAppMessage({
      title: 'VUX', // 分享标题
      desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
      link: 'https://vux.li?x-page=wechat_share_message',
      imgUrl: 'https://static.vux.li/logo_520.png'
    })

    wx.onMenuShareTimeline({
      title: 'VUX', // 分享标题
      desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
      link: 'https://vux.li?x-page=wechat_share_timeline',
      imgUrl: 'https://static.vux.li/logo_520.png'
    })
    // 发起一个异步请求到后端获取wxjsdk的签名等
  })
}

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    if (cookie.get('username') && cookie.get('password') && cookie.get('access_token') && cookie.get('refresh_token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
