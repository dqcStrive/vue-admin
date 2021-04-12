import { getUserRole } from '@/api/login';
import { defaultRouterMap,asnyRouterMap } from '@/router/index'
function hasPremission(roles, router){
  if(router.meta && router.meta.role) {
      return roles.some(item => router.meta.role.indexOf(item) >= 0)
  }

  // // indexOf 对大小写敏感

  // let str = 'aaa Abc';

  // str.indexOf('aaa')  // 0
  // str.indexOf('abc')  // -1
  // str.indexOf('Abc')  // 4



  // console.log(roles)
  // console.log(router.meta.role)

  // [11, 22, 33].includes('11')

  // [11, 22, 33].some(item => item = 22 )

  // 用户角色：["sale", "technician", "manager"]
  // 路由配置：["sale"]
}
const state ={
  roles:[],
  allRouters: defaultRouterMap,
  addRouters:[],
}
const getters = {
  roles:state => state.roles,
  allRouters:state => state.allRouters,
  addRouters:state => state.addRouters
}
const mutations={
  SET_ROLES(state,value){
    state.roles = value
  },
  SET_ROUTER(state,router){
    state.addRouters = router
    state.allRouters = defaultRouterMap.concat(router)
  }
}

const actions = {
  /**
   * 或如用户角色
   * @param {*} param0 
   * @param {*} requestData 
   * @returns 
   */
  getRole({commit},requestData){
    return new Promise((resolve,reject) => {
      getUserRole().then(res => {
        let role = res.data.data;
        commit('SET_ROLES',role)
        resolve(role)
      })
    })
  },
  /**
   * 创建动态路由
   */
   creatRouter({commit},requestData){
    return new Promise((resolve,reject) => {
      let role = requestData;
      //超管状态
      let addRouters = []
      if(role.includes('admin')){      //超管
        addRouters = asnyRouterMap
      }else{//普通管理
        addRouters = asnyRouterMap.filter(item => {
          if(hasPremission(role.item)){
            if(item.children && item.children.length > 0){
              item.children = item.children.filter(child => {
                if(hasPremission(role,child)){
                  return child;
                }
              })
              return item;
            }
            return item;
          }
        })
        addRouters.push(asnyRouterMap[asnyRouterMap.length - 1]);
      }
      //更新路由
      commit('SET_ROUTER',addRouters)
      resolve() 
    })
  }

}



export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations
};