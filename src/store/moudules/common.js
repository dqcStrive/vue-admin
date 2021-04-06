import { GetCategory } from "../../api/news"
const state = {
  QiniuUrl: 'http://qr508a92l.hn-bkt.clouddn.com/'
}
const getters = {
  QiniuUrl: state => state.QiniuUrl
}

const actions = {
  getInfoCategory(content,requestData){
    return new Promise((resolve,reject) => {
      GetCategory().then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default{
  namespaced: true,
  actions,
  state,
  getters
}