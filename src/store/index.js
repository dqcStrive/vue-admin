import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from './moudules/app'
import common from "./moudules/common";
import infoDetailed from "./moudules/infoDetailed";
import permission from "./moudules/permission";
// import login from './modules/login'

export default new Vuex.Store({
  modules: {
    app,
    common,
    infoDetailed,
    permission
  },
})
