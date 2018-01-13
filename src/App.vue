<template>
  <div id="app">
    <view-box ref="viewBox" class="viewBox">
      <transition>
        <router-view></router-view>
      </transition>
      <tabbar slot="bottom" class="footbar" v-show="isTabbarShow">
        <tabbar-item link="/tk">
          <span class="iconfont" slot="icon">&#xe60d;</span>
          <span slot="label">课程</span>
        </tabbar-item>
        <tabbar-item link="/bbs">
          <span slot="icon" class="iconfont">&#xe740;</span>
          <span slot="label">动态</span>
        </tabbar-item>
        <tabbar-item selected link="/">
          <span slot="icon" class="iconfont">&#xe66f;</span>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem, ViewBox} from 'vux'
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    components: {
      Tabbar,
      TabbarItem,
      ViewBox
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        direction: state => state.vux.direction
      }),
      isTabbarShow () {
        if (/^\/tk|\/bbs|\/$/ig.test(this.path)) {
          return true
        }
        return false
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';

  html,
  body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: #fbf9fe;
  }
  .footbar .iconfont {
    font-size: 1.2rem;
  }
  .viewBox {
    width: 100%;
    position: relative;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
