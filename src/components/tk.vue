<template>
  <div class="tk">
    <group title="初级职称">
      <grid :cols="3">
        <grid-item label="grid" v-for="i in 8" :key="i">
          <span class="iconfont" slot="icon">&#xe60c;</span>
        </grid-item>
      </grid>
    </group>
    <group title="中级职称">
      <grid :cols="3">
        <grid-item label="grid" v-for="i in 8" :key="i">
          <span class="iconfont" slot="icon">&#xe60c;</span>
        </grid-item>
      </grid>
    </group>
    <group title="注册会计师">
      <grid :cols="3">
        <grid-item label="grid" v-for="i in 8" :key="i">
          <span class="iconfont" slot="icon">&#xe60c;</span>
        </grid-item>
      </grid>
    </group>
    <ft></ft>
  </div>
</template>

<script type="text/ecmascript-6">
  import ft from './footer.vue'
  import { Group, Cell, Grid, GridItem } from 'vux'
  export default {
    components: {
      ft,
      Cell,
      Group,
      Grid,
      GridItem
    },
    mounted () {
      document.title = '全部课程'
    },
    data () {
      return {}
    }
  }
</script>

<style>
  .tk {
    width: 100%;
  }

</style>
