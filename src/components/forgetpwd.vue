<template>
  <div class="forgetpwd">
    <group title="找回密码">
      <x-input title="手机号码" v-model="tel" ref="tel" :readonly="true" :disabled="true"></x-input>
      <x-input title="手机验证码" v-model="verify">
        <x-button @click.native="sendverifycode" slot="right" type="primary" mini :disabled="isDisabled" v-text="codeBtnText"></x-button>
      </x-input>
    </group>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { Group, XInput, XButton } from 'vux'
  export default {
    components: {
      Group, XInput, XButton
    },
    data () {
      return {
        codeBtnText: '发送验证码',
        isDisabled: false,
        verify: '',
        tel: ''
      }
    },
    computed: {
      ...mapGetters(['member', 'token'])
    },
    mounted () {
      document.title = '找回密码'
      this.tel = this.member.tel
    },
    methods: {
      sendverifycode () {
        if (this.tel === '') {
          return false
        }
        this.isDisabled = true
        this.$http.post('api/sendverifycode', {
          tel: this.member.tel
        }, {
          'headers': {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
          }
        }).then(res => {
          if (res.data.status === 1) {
            let i = res.data.expire
            var timer = setInterval(_ => {
              if (i <= 0) {
                this.isDisabled = false
                this.codeBtnText = '发送验证码'
                clearInterval(timer)
              } else {
                this.codeBtnText = i + '秒后可重发'
                i--
              }
            }, 1000)
          } else {
            this.isDisabled = false
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'text',
              width: '20em'
            })
          }
        }).catch(() => {
          this.$vux.toast.show({
            text: '异常错误'
          })
        })
      }
    }
  }
</script>

