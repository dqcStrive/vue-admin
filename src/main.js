import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import ElementUI from 'element-ui';
import VueCompositionApi from '@vue/composition-api';
import 'element-ui/lib/theme-chalk/index.css';
import '@/router/premit';

//自定义全局组件
import '@/icons';
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
