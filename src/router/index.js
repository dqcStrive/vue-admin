import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout';

Vue.use(VueRouter);

/**
 * 1，系统分配
 * 2，角色分配
 */

/**
 * 1，默认路由
 * 
 */
export const defaultRouterMap = [
    /**登录主页 */
    {
      path: "/",
      redirect: 'login',
      hidden:true,
      meta:{
        name: '主页'
      },
    },
    {
      path: "/login",
      name: 'Login',
      hidden:true,
      meta:{
        name: '登录'
      },
      component: () =>
        import("@/views/Login")
    },
  
    {
      path: "/console",
      name: 'Console',
      redirect: 'index',
      meta:{
        name: '控制台',
        icon: 'console'
      },
      component: Layout,
      children:[
          {
            path: "/index",
            name: 'Index',
            meta:{
              name: '首页'
            },
            component: () =>
              import("@/views/Console")
          }
        ]
    },
    //404页面
    {
      path: "/console",
      meta:{
        name: '404',
        icon: '404'
      },
      hidden: true,
      component: Layout,
      children:[
          {
            path: "/404",
            hidden: true,
            meta:{
              name: '404'
            },
            component: () =>
              import("@/views/404.vue")
          }
        ]
    }, 
]

const router = new VueRouter({
  routes: defaultRouterMap,
});

export default router;
/**
 * 动态路由
 */
export const asnyRouterMap = [
  /**信息 */
  {
    path: "/info",
    name: 'Info',
    meta:{
      system: 'infoSystem',
      name: '信息管理',
      icon: 'info'
    },
    component: Layout,
    children:[
        {
          path: "/infoIndex",
          name: 'InfoIndex',
          meta:{
            keepAlive: true,
            name: '信息列表'
          },
          component: () =>
            import("@/views/Info")
        },
        {
          path: "/infoCategory",
          name: 'InfoCategory',
          meta:{
            name: '信息分类'
          },
          component: () =>
            import("@/views/Info/category.vue")
        },
        {
          path: "/infoDetailed",
          name: 'InfoDetailed',
          hidden: true,
          meta:{
            name: '信息详情'
          },
          component: () =>
            import("@/views/Info/detailed.vue")
        },
      ]
  },
// /**用户 */
  {
    path: "/user",
    name: 'User',
    meta:{
      system: 'userSystem',
      name: '用户管理',
      icon: 'user'
    },
    component: Layout,
    children:[
        {
          path: "/userIndex",
          name: 'UserIndex',
          meta:{
            name: '用户列表'
          },
          component: () =>
            import("@/views/User/index.vue")
        },
      ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden:true
  }
]
