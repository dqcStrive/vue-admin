import {GetCategory} from '@/api/news';
import service from "@/utils/request";
import { reactive } from '_@vue_composition-api@1.0.0-rc.6@@vue/composition-api';
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