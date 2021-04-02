<template>
  <div id="main-wrap">
      <div class="content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Main'
  
}
</script>

<style lang="scss" scoped>
@import '../../../styles/config.scss';
  #main-wrap{
   position: fixed;
   left: $navMenu;
     top: 75px;
     right: 0;
     bottom: 0;
     border: 30px solid #f7f7f7;
    border-bottom: none;
    @include webkit(box-sizing,border-box);
    @include webkit(transition,all .3s ease 0s);

  }
//   .main-content {
//     width: 100%;
//     height: 100%;
//     padding-top: $layoutHeader + 30;
//     padding-left: $navMenu + 30;
//     padding-right: 30px;
//     box-sizing: border-box;
// }
.open{
  #main-wrap{
  left: $navMenu;

  }
}
.close{
  #main-wrap{
    left: $navMenuMin;
  }
}
.content{
    width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    @include webkit(box-sizing,border-box);
    background-color: #fff;
}
</style>