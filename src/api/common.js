import {GetCategory} from '@/api/news';
import service from "@/utils/request";
import { reactive } from '@vue/composition-api';
export function common(){
  const categoryItem = reactive({
    item:[]
  });
  /**
   * 获取分类
   */
  const getInfoCategory = (params) => {
    GetCategory().then(res => {
      let data = res.data.data
      categoryItem.item = data
    }).catch(err => {

    })
  }
  return{
    getInfoCategory,
    categoryItem
  }
}

/**获取七牛云token */
export function QiniuToken(data){
    return service.request({
      method: 'post',
      url: '/uploadImgToken/',
      data
    })
}

/**获取用户信息 */
export function LoadTableData(params){
  return service.request({
    method: params.method || 'post',
    url: params.url,
    data:params.data
  })
}

/**
 * 获取city
 */

 export function GetCityPicker(data){
  return service.request({
    method: 'post',
    url: '/cityPicker/',
    data
  })
}