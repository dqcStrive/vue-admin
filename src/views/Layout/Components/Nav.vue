<template>
  <div id="nav-wrap">
    <h1 class="logo">
    <img src="@/assets/images/logo.png" alt="">

    </h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color= "#344a5f"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
    <template v-for="(item,index) in routers" background-color="red">
      <el-submenu v-if="!item.hidden"  :key="item.id" :index="index + ''">
        <!-- 一级菜单 -->
        <template slot="title">
          <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <!-- 二级菜单 -->
        <template v-for="subItem in item.children">
          <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path" >
            {{ subItem.meta.name }}
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
      
    </el-menu>
  </div>
</template>

<script>
import { ref,reactive,computed } from '@vue/composition-api'
export default {
  name:'navMenu',
  setup(prop,{root}){
    /**定义数据********************** */
    // const isCollapse = ref(false)
    const routers = reactive(root.$router.options.routes)

    /**定义函数****************************** */

    //computed监听
    const isCollapse = computed(() => {
       return root.$store.state.app.isCollapse
    })

    return {
      isCollapse,
      routers
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/config.scss';
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  
  @include webkit(transition,all .3s ease 0s);
  svg{
    font-size: 20px;
    margin-right: 25px;
  }
  .logo{
    // text-align: center;
    img{
      margin-left: 50%;
      transform: translateX(-50%);
      width: 92px;
      @include webkit(transition,all .5s ease 0s);
    }
  }
  .open{
    #nav-wrap{
      width: $navMenu;
    }
  }
  .close{
    #nav-wrap{
      width: $navMenuMin;
    }
    .logo img{
      // margin: auto;
      width: 70%;
    }
  }
}

</style>