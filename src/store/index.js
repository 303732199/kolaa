import Vuex from 'vuex'
import Vue from 'vue'
import {cookie, base64, ToastPlugin} from 'vux'

Vue.use(Vuex)
Vue.use(ToastPlugin)
const store = new Vuex.Store({
  state: {
    member: null,
    username: '',
    password: '',
    token: '',
    host: 'http://192.168.1.8/',
    accessTokenConfig: {
      grant_type: 'password',
      client_id: 7,
      client_secret: 'y9xU5XNbM7G14pv6YrFFu70x18OXs1i1BEPap8AY',
      scope: ''
    },
    refreshTokenConfig: {
      grant_type: 'refresh_token',
      client_id: 7,
      client_secret: 'y9xU5XNbM7G14pv6YrFFu70x18OXs1i1BEPap8AY',
      scope: ''
    }
  },
  getters: {
    token (state) {
      return state.token || cookie.get('access_token')
    },
    username (state) {
      let username = state.username || cookie.get('username')
      if (username) {
        return base64.decode(username)
      }
      return ''
    },
    password (state) {
      let password = state.password || cookie.get('password')
      if (password) {
        return base64.decode(password)
      }
      return ''
    },
    member (state) {
      let member = state.member || window.sessionStorage.getItem('member')
      if (member) {
        return JSON.parse(member)
      }
      return null
    }
  },
  mutations: {
    saveUserInfo (state, payload) {
      state.member = payload
    }
  },
  actions: {
    refreshToken ({state, commit}, fn) {
      Vue.http.post('oauth/token', Object.assign(state.refreshTokenConfig, cookie.get('refresh_token'))).then(res => {
        if (res.status === 200) {
          cookie.set('access_token', res.data.access_token, {expires: Math.ceil(res.data.expires_in / 3600 / 24)})
          cookie.set('refresh_token', res.data.refresh_token, {expires: 365})
          state.token = res.data.access_token
          if (fn) {
            fn(true)
          }
        }
      }).catch(() => {
        Vue.$vux.toast.show({
          text: '接口token获取失败',
          type: 'warn'
        })
        if (fn) {
          fn(false)
        }
      })
    },
    getAccessToken ({state, commit}, data) {
      Vue.http.post('oauth/token', data.data).then(res => {
        if (res.status === 200) {
          cookie.set('access_token', res.data.access_token, {expires: res.data.expires_in / 3600 / 24})
          cookie.set('refresh_token', res.data.refresh_token, {expires: res.data.expires_in * 2 / 3600 / 24})
          cookie.set('username', base64.encode(data.data.username), {expires: res.data.expires_in * 2 / 3600 / 24})
          cookie.set('password', base64.encode(data.data.password), {expires: res.data.expires_in * 2 / 3600 / 24})
          state.token = res.data.access_token
          state.username = res.data.username
          state.password = res.data.password
          if (typeof data.fn !== 'undefined') {
            data.fn(true)
          }
        }
      }).catch((res) => {
        Vue.$vux.toast.show({
          text: '账号或密码错误',
          type: 'text'
        })
        if (typeof data.fn !== 'undefined') {
          data.fn(false)
        }
      })
    }
  },
  modules: {
    vux: {
      state: {
        demoScrollTop: 0,
        isLoading: false,
        direction: 'forward'
      },
      mutations: {
        updateDemoPosition (state, payload) {
          state.demoScrollTop = payload.top
        },
        updateLoadingStatus (state, payload) {
          state.isLoading = payload.isLoading
        },
        updateDirection (state, payload) {
          state.direction = payload.direction
        }
      },
      actions: {
        updateDemoPosition ({commit}, top) {
          commit({type: 'updateDemoPosition', top: top})
        }
      }
    }
  }
})

export default store
