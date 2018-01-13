<template>
  <div class="hello">
    <card>
      <div slot="content">
        <div class="avatar-info">
          <div class="avatar">
            <img v-if="userInfo.avatar" class="avatar-img" :src="host + userInfo.avatar">
            <img class="avatar-img" :src="url" v-else>
            <span class="ml-10 username">{{userInfo.nickname}}</span>
          </div>
          <x-button plain type="primary" mini style="border-radius:99px;">个人资料</x-button>
        </div>
        <div class="short-key">
          <div>
            <span v-if="userInfo" v-html="userInfo.order_num">0</span>
            <small class="c-gray">订单</small>
          </div>
          <div class="line"></div>
          <div>
            <span v-if="userInfo">0</span>
            <small class="c-gray">消息</small>
          </div>
          <div class="line"></div>
          <div>
            <span v-if="userInfo" v-html="userInfo.score">0</span>
            <small class="c-gray">积分</small>
          </div>
        </div>
      </div>
    </card>
    <group-title>我的课程</group-title>
    <grid :cols="2" class="bg-white practice">
      <grid-item v-for="(i,index) in userInfo.course" :key="index">
        <img class="course-img" :src="host +'upload/' + i.thumb"></img>
        <div class="c-primary text-small mt-5">{{i.title}}</div>
        <div class="c-secondary text-small c-orange">截止日期：{{i.expire}}</div>
      </grid-item>
    </grid>

    <group>
      <cell title="安全中心" is-link link="profile">
        <span slot="icon" class="iconfont mr-10">&#xe609;</span>
      </cell>
      <cell title="联系我们" is-link link="contact">
        <span slot="icon" class="iconfont mr-10">&#xe619;</span>
      </cell>
      <!--<cell title="我要推广" is-link>-->
      <!--<span slot="icon" class="iconfont mr-10">&#xe609;</span>-->
      <!--</cell>-->
      <cell title="退出登录">
        <span slot="icon" class="iconfont mr-10">&#xe668;</span>
      </cell>
    </group>
    <ft></ft>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import ft from './footer.vue'
  import {
    Card,
    Blur,
    Flexbox,
    FlexboxItem,
    XButton,
    Cell,
    Grid,
    Group,
    GridItem,
    GroupTitle,
    Marquee,
    MarqueeItem,
    Icon
  } from 'vux'

  export default {
    name: 'home',
    components: {
      ft,
      Card,
      Blur,
      Flexbox,
      FlexboxItem,
      XButton,
      Cell,
      Grid,
      GridItem,
      Group,
      GroupTitle,
      Marquee,
      MarqueeItem,
      Icon
    },
    data () {
      return {
        userInfo: {},
        url: '/static/img/male-70.png',
        examModules: [
          {icon: '&#xe600;', text: '章节'},
          {icon: '&#xe63a;', text: '模拟'},
          {icon: '&#xe64c;', text: '错题'},
          {icon: '&#xe601;', text: '收藏'},
          {icon: '&#xe603;', text: '进度'},
          {icon: '&#xe602;', text: '提问'}
        ]
      }
    },
    mounted () {
      document.title = '我的'
    },
    computed: {
      ...mapState(['host']),
      ...mapGetters(['token', 'username', 'password', 'member'])
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.getUserInfo()
      },
      getUserInfo () {
        if (this.member) {
          this.userInfo = this.member
          return
        }
        this.$http.post('api/user', {
          username: this.username
        }, {
          'headers': {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
          }
        }).then(res => {
          if (res.data.status === 1) {
            this.userInfo = res.data.response
            this.$store.commit('saveUserInfo', JSON.stringify(res.data.response))
            window.sessionStorage.setItem('member', JSON.stringify(res.data.response))
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    width: 100%;
  }

  .iconfont {
    color: #FF9900
  }

  .practice .iconfont {
    font-size: 1.3rem;
  }

  .avatar-info {
    padding: 20px 15px 10px 15px;
    display: flex;
    align-items: center;
  }

  .avatar {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .avatar-img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .username {
    font-weight: 300;
  }

  .short-key {
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .short-key div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .short-key div.line {
    width: 1px;
    flex: none;
    height: 20px;
    border-right: 1px solid #f3f3f3;
  }

  .course-img {
    height: 6rem;
    width: 100%;
    border-radius: 5px
  }

</style>
