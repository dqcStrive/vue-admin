import router from './index';
import store from '@/store/index';

import {getToken,removeToken,removeUserName} from '@/utils/app'


const whiteRouter = ['/login']

router.beforeEach((to,from,next) => {
  if(getToken()){
    //路由动态添加
    if(to.path === '/login'){
      removeUserName();
      removeToken();
      store.commit('SET_TOKEN', '');
      store.commit('SET_USERNAME', '');
      next();
    }else{
      //获取用户角色
      //动态分配路由权限
      if(store.getters['permission/roles'].length === 0){
        store.dispatch('permission/getRole').then(res => {
          let role = res.role;
          // let button = res.button;
          let btnPerm = res.btnPerm;
          store.commit('app/SET_ROLES',role);
          store.commit('app/SET_BUTTON',btnPerm);
          //存储角色
          store.dispatch('permission/creatRouter',role).then(res => {
            let addRouters = store.getters['permission/addRouters'];
            let allRouters = store.getters['permission/allRouters'];
            //路由更新
            router.options.routes = allRouters

            //添加动态路由
            router.addRoutes(addRouters)
            next({...to,replace:true});
          })
        });
      }else{
        next();
      }

    }
  }else{
    console.log('不存在');
    if(whiteRouter.indexOf(to.path) !== -1){
      next();
    }else{
      next('/login')
    }
  }
})