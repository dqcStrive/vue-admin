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
      next();
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