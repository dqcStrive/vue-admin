import { GetCategory } from "../../api/news"


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
  actions
}