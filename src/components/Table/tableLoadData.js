import {
  reactive
} from "@vue/composition-api";
import {
  requestUrl
} from '@/api/requestUrl';
import {
  LoadTableData
} from '@/api/common';
export function LoadData() {
  const tableData = reactive({
    item: [],
    total: 0
  });

  const tableLoadData = (params) => {
    
    let requestJson = params;
    let requestData = {
      url: requestUrl[requestJson.url],
      method: requestJson.method,
      data: requestJson.data
    }
    console.log(requestData);

    LoadTableData(requestData).then(res => {
      let responseData = res.data.data.data;
      //后台返回数据，并不是返回一个数组，有时返回一个null
      tableData.item = responseData
      tableData.total = responseData.length === 0 ? 0 : res.data.data.total 
    }).catch(err => {

    })
  }

  return {
    tableData,
    tableLoadData
  }
}