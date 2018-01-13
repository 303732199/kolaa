<template>
  <div class="login">
    <div class="text-center pt-30">
      <img src="/static/img/logo.png" alt="logo">
    </div>
    <group>
      <x-input title="账号" placeholder="请输入您的账号" ref="uname" required is-type="china-mobile" :show-clear="true"
               v-model="form.username"></x-input>
      <x-input title="密码" type="password" placeholder="请输入您的密码" ref="pwd" :show-clear="true" required
               v-model="form.password"></x-input>
    </group>
    <div class="pd-10 text-right">
      <x-button @click.native="login" type="primary" text="登陆" :show-loading="loading"></x-button>
      <x-button @click.native="goReg" type="primary" :plain="true" text="没有账号？去注册"></x-button>
      <a @click.native="goForgetPwd" class="c-gray">忘记密码？</a>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import {XInput, Group, XButton, cookie} from 'vux'
  export default {
    components: {
      XInput,
      Group,
      XButton
    },
    data () {
      return {
        loading: false,
        form: {
          username: '',
          password: ''
        }
      }
    },
    mounted () {
      document.title = '用户登陆'
      this.$refs.uname.focus()
    },
    computed: {
      ...mapState({
        accessTokenConfig: state => state.accessTokenConfig
      })
    },
    methods: {
      goReg () {
        this.$router.push({path: '/reg'})
      },
      goForgetPwd () {
        this.$router.push({path: '/forgetpwd'})
      },
      login () {
        if (!this.$refs.uname.valid || !this.$refs.pwd.valid || this.form.username === '' || this.form.password === '') {
          return
        }
        let form = Object.assign(this.form, this.accessTokenConfig)
        let accessToken = cookie.get('access_token')
        let refreshToken = cookie.get('refreshToken')
        if (!accessToken) {
          if (refreshToken) {
            this.loading = true
            this.$store.dispatch('refrushToken', (state) => {
              this.loading = false
              if (state) {
                this.$router.push({path: '/'})
              }
            })
          } else {
            this.loading = true
            this.$store.dispatch('getAccessToken', {
              data: form,
              fn: (state) => {
                if (state) {
                  this.$router.push({path: '/'})
                }
                this.loading = false
              }
            })
          }
        }
      }
    }
  }
</script>
<style>
  .login {
    width: 100%;
  }
</style>
