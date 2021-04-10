import { GetCityPicker } from '@/api/common'
import { reactive,toRefs } from '@vue/composition-api'
export function cityPicker(){

      //定义接收数据
      const data = reactive({
        provinceData:[],
        cityData:[],
        streetData:[],
        areaData: [],
        provinceValue: '',
        cityValue:'',
        areaValue: '',
        streetValue: ''
      })

      //定义返回数据
      const resultData = reactive({
        provinceValue: '',
        cityValue: '',
        areaValue: '',
        streetValue: '',
      })

      //获取省份
      const getGrocince = () => {
        let requestData = {
          // 获取省份
          type:"province"
        }
        getData(requestData);
      }
  
      //选择省份 获取城市
      const handleProvince = (value) => {
        resetValue({type:'city'})
          let requestData = {
          // 获取城市
          type:"city",
          province_code: value
        }
        getData(requestData);
      }
  
      //选城市择 获取区/县
      const handleCity = (value) => {
        resetValue({type:'area'})
        let requestData = {
          type:"area",
          city_code: value
        }
        getData(requestData);  
      }
  
      //选择区 获取街道
      const handleArea = (value) => {
        resetValue({type:'street'})
        let requestData = {
          type:"street",
          area_code: value
        }
        getData(requestData);
      }

      //选择街道
      const handleStreet = (val) => {
        resetValue({type: ''})
      }

      //获取数据
      const getData = (requestData) => {
        GetCityPicker(requestData).then(res => {
          data[`${requestData.type}Data`] = res.data.data.data;
        }).catch(err => {
  
        })
      }

      //重置选项
      const resetValue = (params) => {
        const valueJson = {
          city:['cityValue','areaValue','streetValue'],
          area:['areaValue','streetValue'],
          street:['streetValue']
        }
        const arrObj = valueJson[params.type]
        //清空指定key值
        if(arrObj){arrObj.forEach(item => data[item] = '');}
        result()
      }

      //返回结果
      const result = () => {
        for(let key in resultData){
          resultData[key] = data[key]
        }
      }

  return {
    // ...toRefs(data),//把对象类型转为基础数据类型
    data,
    resultData,
    getGrocince,
    handleProvince,
    handleCity,
    handleArea,
    handleStreet
  }
}