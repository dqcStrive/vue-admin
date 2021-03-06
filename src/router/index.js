import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout'

Vue.use(VueRouter);

const routes = [
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

  /**信息 */
  {
    path: "/info",
    name: 'Info',
    meta:{
      name: '信息管理',
      icon: 'info'
    },
    component: Layout,
    children:[
        {
          path: "/infoIndex",
          name: 'InfoIndex',
          meta:{
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
      ]
  },
// /**用户 */
  {
    path: "/user",
    name: 'User',
    meta:{
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
];

const router = new VueRouter({
  routes,
});

export default router;
