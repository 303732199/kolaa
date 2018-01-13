<template>
  <div class="profile">
    <group title="我的资料">
      <cell title="头像">
        <img class="avatar" slot="default" :src="host + member.avatar" v-if="member.avatar">
        <img v-else slot="default" src="/static/img/male-70.png" alt="">
      </cell>
      <cell title="累计登录次数" :value="member.logintimes + '次'"></cell>
      <cell title="昵称" :value="member.nickname"></cell>
      <cell title="电话号码" :value="member.tel"></cell>

      <cell v-if="" is-link title="绑定邮箱" link="blindemail" :value="member.email"></cell>
      <cell is-link title="修改密码" link="resetpassword"></cell>
      <cell is-link title="找回密码" link="forgetpwd"></cell>
    </group>
  </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import { Group, Cell } from 'vux'
  export default {
    components: {
      Group,
      Cell
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['host']),
      ...mapGetters(['member'])
    }
  }
</script>
<style>
  .profile {
    width: 100%;
  }
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
</style>
