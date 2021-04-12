<template>
  <div class="page404">
    <h1>404</h1>
  </div>
</template>


<script>
export default {
  name: 'Page404',
  computed:{
    message(){
      return 'The webmaster said you can not enter this page...'
    }
  }
}
</script>

<style lang="scss" scoped>
.page404{
  height: 100vh;
  text-align: center;
  transform: translate(-50%);
}
</style>