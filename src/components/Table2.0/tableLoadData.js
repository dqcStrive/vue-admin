import { reactive } from "@vue/composition-api";
import { requestUrl } from '@/api/requestUrl';
import {LoadTableData } from '@/api/common';
export function LoadData() {
  const tableData = reactive({
    item:[],
    total:0
  });

  const tableLoadData = (params)=>{
    let requestJson = params;
    let requestData = {
      url: requestUrl[requestJson.url],
      method: requestJson.method,
      data: requestJson.data
    }

    LoadTableData(requestData).then(res => {
      let responseData = res.data.data.data;
      if(responseData && responseData.length > 0){
        tableData.item = responseData
        tableData.total = res.data.data.total
      }
    }).catch(err => {

    })
  }

  return {
    tableData,tableLoadData
  }
}