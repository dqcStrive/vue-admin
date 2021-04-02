<template>
  <div id="layout-wrap" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader></LayoutHeader>
    <LayoutNav></LayoutNav>
    <LayoutMain></LayoutMain>
  </div>
</template>

<script>
import LayoutHeader from './Components/Header'
import LayoutNav from './Components/Nav'
import LayoutMain from './Components/Main'
import { computed } from '@vue/composition-api'
export default {
  name: 'layout',
  components:{
    LayoutHeader,
    LayoutNav,
    LayoutMain
  },
  setup(props,{root}){
    const menuStatus = computed(() => root.$store.state.app.isCollapse)

    return {
      menuStatus,
    }
  }
}
</script>

<style lang="scss" scoped>
#layout-wrap{
  font-size: 14px;
}
</style>