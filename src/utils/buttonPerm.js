import Vue from 'vue'
import store from "../store/index";

//自定义指令
Vue.directive('btnPerm',{
  bind:function(el,bingind,vnode) {
    if(bingind.def.hasBtnPerm(bingind.value)){
      // el.style.display = 'block';
      el.className = el.className + ' show-button';
    }

  },
  inserted:function(){

  },
  hasBtnPerm:function(params){
    const button = store.getters['app/buttonPermission'];//请求到数据权限
    const roles = store.getters['app/roles'];//获取角色
    //超级管理员
    if(roles.includes('admin')) {return true}
    return button.indexOf(params) != -1;
  }
})