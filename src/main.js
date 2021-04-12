import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import ElementUI from 'element-ui';
import VueCompositionApi from '@vue/composition-api';
import 'element-ui/lib/theme-chalk/index.css';
import '@/router/premit';
//自定义全局组件
import '@/icons';
//自定义全局指令
import '@/utils/buttonPerm'
// 全局方法引入按钮权限
import { buttonPermission } from "./utils/buttonPermission";
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
Vue.prototype.btnPerm = buttonPermission;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
