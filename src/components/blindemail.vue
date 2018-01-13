<template>
  <div class="wrapper">
    <div>
      <popup v-model="popshow" position="top" :show-mask="false">
        <div class="popstyle" v-html="popText"></div>
      </popup>
    </div>
    <group title="绑定邮箱可收到考试相关资讯或产品优惠信息">
      <x-input title="电子邮件" is-type="email" placeholder="请输入邮件地址" ref="email" required
               :show-clear="true"
               v-model="email"></x-input>
    </group>
    <div class="pd-10 text-right">
      <x-button @click.native="blind" type="primary" text="绑定邮箱" :show-loading="loading" :disabled="isDisabled"></x-button>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import { Group, XInput, XButton, Popup } from 'vux'
  export default {
    components: {
      Group,
      XInput,
      XButton,
      Popup
    },
    data () {
      return {
        isDisabled: true,
        popText: '',
        popshow: false,
        loading: false,
        email: ''
      }
    },
    mounted () {
      document.title = '绑定邮箱'
      if (this.member.email) {
        this.email = this.member.email
      }
      this.$refs.email.focus()
    },
    computed: {
      ...mapGetters(['token', 'member', 'username'])
    },
    methods: {
      blind () {
        if (this.email === '' || !this.$refs.email.valid) {
          return false
        }
        this.$http.post('api/email', {email: this.email, username: this.username}, {
          'headers': {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
          }
        }).then(res => {
          if (res.data.status === 1) {
            this.member.email = this.email
            window.sessionStorage.setItem('member', JSON.stringify(this.member))
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
    },
    watch: {
      email (oldvalue, newValue) {
        if (newValue === '' && this.$refs.email.valid) {
          this.isDisabled = false
          return
        } else {
          this.isDisabled = true
        }
        if (newValue) {
          if (this.$refs.email.valid) {
            this.isDisabled = false
          }
        } else {
          this.isDisabled = true
        }
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
