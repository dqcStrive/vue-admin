import Vue from "vue";
import Vuex from "vuex";
import app from './moudules/app'
import common from "./moudules/common";
import infoDetailed from "./moudules/infoDetailed";
// import login from './modules/login'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    common,
    infoDetailed
  },
})
