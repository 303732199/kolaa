<template>
  <div class="bbs">
    <card>
      <button-tab slot="content" class="pd-10" v-model="curr">
        <button-tab-item @on-item-click="consoleIndex()">广场</button-tab-item>
        <button-tab-item @on-item-click="consoleIndex()">我的</button-tab-item>
      </button-tab>
    </card>

    <card class="pd-10" v-for="i in 10" :key="i">
      <div slot="header">
        <flexbox :gutter="0" orient="horizonal" align="flex-start">
          <flexbox-item span="50">
            <img src="/static/img/male-70.png" alt="" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #f9f9f9">
          </flexbox-item>
          <flexbox-item>
            <flexbox :gutter="0" orient="vertical">
              <flexbox-item class="username">
                爱枯的小毛驴
              </flexbox-item>
              <flexbox-item class="small-data">
                <small>2017/10/29</small>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </div>
      <div slot="content" class="user-content mt-10">
        <i class="iconfont">&#xe688;</i> 17天前 完成了 初级会计实务 （模拟一）
      </div>
      <div slot="footer" class="pd-10" style="padding-bottom: 0">
        <flexbox orient="horizonal" :gutter="0">
          <flexbox-item span="60" class="comeon">
            <span class="iconfont">&#xe647;</span>
            <span class="c-gray">1</span>
          </flexbox-item>
          <flexbox-item span="60" class="message">
            <span class="iconfont">&#xe604;</span>
            <span class="c-gray">2</span>
          </flexbox-item>
        </flexbox>
      </div>
    </card>

    <ft></ft>
  </div>
</template>

<script type="text/ecmascript-6">
  import ft from './footer.vue'
  import {Alert, Flexbox, FlexboxItem, Group, Card, XHeader, ButtonTab, ButtonTabItem} from 'vux'
  export default {
    components: {
      ft,
      Alert,
      Card,
      Group,
      XHeader,
      ButtonTab,
      ButtonTabItem,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        curr: 0
      }
    },
    mounted () {
      document.title = '动态'
    },
    methods: {
      consoleIndex () {
        this.$vux.alert.show({
          title: 'Vux is Cool',
          content: 'Do you agree?',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
      }
    }
  }
</script>

<style scope>
  .bbs {
    width: 100%;
  }

  .username {
    padding-top: 5px;
    color: #4B2B2B;
    font-weight: 200;
    font-size: .9rem;

  }
  .small-data {
    font-size: .8rem;
    line-height: .9;
    color: #909399;
  }
  .user-content {
    padding: 5px 10px 5px;
    background: #f3f3f3;
    font-size: .7rem;
    color: #6fc36e;
  }
  .user-content .iconfont {
    font-size: .8rem;
    color: #FF9900;
  }
  .comeon {
    font-size: .9rem;
  }

</style>
