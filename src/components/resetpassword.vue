<template>
  <div class="resetpassword">
    <div>
      <popup v-model="popshow" position="top" :show-mask="false">
        <div class="popstyle" v-html="popText"></div>
      </popup>
    </div>
    <group title="修改密码">
      <x-input title="旧密码" type="password" placeholder="请输入旧密码" ref="oldpwd" required
               :show-clear="true"
               v-model="form.oldpwd"></x-input>
      <x-input title="新密码" type="password" placeholder="请输入您的新密码" ref="newpwd" :show-clear="true" required
               v-model="form.newpwd"></x-input>
      <x-input title="确认密码" type="password" placeholder="再次输入您的新密码" ref="confirmed" :show-clear="true" required
               v-model="form.confirmed"></x-input>
    </group>
    <div class="pd-10 text-right">
      <x-button @click.native="resetpwd" type="primary" text="确认修改" :show-loading="loading"></x-button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {Group, Cell, XInput, XButton, cookie, Popup, base64} from 'vux'
  export default {
    name: 'resetpassword',
    components: {
      Group,
      Cell,
      XInput,
      XButton,
      Popup
    },
    data () {
      return {
        loading: false,
        popshow: false,
        popText: '',
        form: {
          oldpwd: '',
          newpwd: '',
          confirmed: ''
        }
      }
    },
    computed: {
      ...mapGetters(['token'])
    },
    mounted () {
      document.title = '修改密码'
    },
    methods: {
      resetpwd () {
        let keys = Object.keys(this.form)
        let bool = true
        keys.map(v => {
          if (this.form[v] === '') {
            bool = false
            this.$refs[v].focus()
            this.$refs[v].blur()
            return false
          }
        })
        if (!bool) {
          return false
        }
        if (this.form.oldpwd !== base64.decode(cookie.get('password'))) {
          this.showMsg('旧密码错误')
          return
        }
        if (this.form.newpwd !== this.form.confirmed) {
          this.showMsg('两次密码输入不一致')
          return
        }
        let form = Object.assign(this.form, {username: base64.decode(cookie.get('username'))})
        this.$http.post('api/password', form, {
          'headers': {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
          }
        }).then(res => {
          if (res.data.status === 1) {
            cookie.set('password', base64.encode(this.form.newpwd))
            this.$vux.toast.show({
              type: 'success',
              text: '修改成功'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 2000)
          } else {
            this.showMsg(res.data.msg)
          }
        }).catch(() => {
          this.showMsg('异常错误')
        })
      },
      showMsg (text) {
        this.popText = text
        this.popshow = true
        setTimeout(v => {
          this.popshow = false
        }, 2000)
      }
    }
  }
</script>
<style>
  .popstyle {
    background-color: #FFBCBC;
    color: #000;
    text-align: center;
    padding: 10px;
  }
  .vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
</style>
