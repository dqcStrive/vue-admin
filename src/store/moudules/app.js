import { Login,Logout } from "@/api/login";
import { setToken,removeToken,removeUserName, setUserName,getUserName} from '@/utils/app'

const state ={
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  to_ken: '',
  username: getUserName() || '',
  roles:[],
  buttonPermission: [],
}
const getters = {
  isCollapse: state => state.isCollapse,
  roles: state => state.roles,
  buttonPermission: state => state.buttonPermission
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
  },
  SET_ROLES(state, value){
    state.roles = value;
  },
  SET_BUTTON(state, value){
      state.buttonPermission = value;
      
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
        content.commit('SET_ROLES', []);
        setToken(data.token);
        setUserName(data.username);

        resolve(res)

      }).catch(err => {
        reject(err)
      })
    })
  },
  logout({commit}){
   
    return new Promise((resolve,reject) => {
      Logout().then(res => {
        let data = res.data
        removeToken();
        removeUserName();
        commit('SET_TOKEN','');
        commit('SET_USERNAME','');
        resolve(data);
      })

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