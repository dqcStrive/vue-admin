import { Login } from "@/api/login";
import { setToken,removeToken,removeUserName, setUserName,getUserName} from '@/utils/app'


const state ={
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  to_ken: '',
  username: getUserName() || ''
}
const getters = {
}
const mutations={
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state,value){
    state.to_ken = value;
  },
  SET_USERNAME(state,value){
    state.username = value;
  }
}

const actions = {
  login(content, repuestData) {
    return new Promise((resolve, reject) => {
      //接口
      Login(repuestData).then(res => {
        let data = res.data.data;

        //token,username
        content.commit('SET_TOKEN',data.token);
        content.commit('SET_USERNAME',data.username);
        setToken(data.token);
        setUserName(data.username);

        resolve(res)

      }).catch(err => {
        reject(err)
      })
    })
  },
  exit({commit}){
   
    return new Promise((resolve,reject) => {
      removeToken();
      removeUserName();
      commit('SET_TOKEN','');
      commit('SET_USERNAME','');
      resolve();
    })
  }
}



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};