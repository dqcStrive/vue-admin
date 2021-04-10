<template>
  <div class="overflow-h">
    <el-row :gutter="10">
      <el-col :span="6" v-if="init.province">
        <el-select
          v-model="data.provinceValue"
          placeholder="选择省"
          @change="handleProvince"
        >
          <el-option
            v-for="item in data.provinceData"
            :key="item.PROVINCE_CODE"
            :value="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.city">
        <el-select
          v-model="data.cityValue"
          placeholder="选择市"
          @change="handleCity"
        >
          <el-option
            v-for="item in data.cityData"
            :key="item.CITY_CODE"
            :value="item.CITY_CODE"
            :label="item.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.area">
        <el-select
          v-model="data.areaValue"
          placeholder="选择区/县"
          @change="handleArea"
        >
          <el-option
            v-for="item in data.areaData"
            :key="item.AREA_CODE"
            :value="item.AREA_CODE"
            :label="item.AREA_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.street">
        <el-select 
        v-model="data.streetValue" 
        placeholder="选择街道"
        @change="handleStreet"
        >
          <el-option
            v-for="item in data.streetData"
            :key="item.STREET_CODE"
            :value="item.STREET_CODE"
            :label="item.STREET_NAME"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { cityPicker } from "@/mixins/cityPicker";
import { onBeforeMount, reactive, watch } from '@vue/composition-api';
export default {
  name: "CityPicker",
  props:{
    cityPickerData:{
      type: Object,
      default: () => {}
    },
    cityPickerLevel:{
      type:Array,
      default: () => []
    }
  },
  setup(props,{emit}) {
    //cityPicker组件方法
    const {data,resultData,getGrocince,handleProvince,handleCity,handleArea,handleStreet,} = cityPicker();

    /**定义数据 */

    //初始化市区街联动
    const init = reactive({
      province:false,
      city:false,
      arem:false,
      street:false,
    })



    /**定义方法 */

    /**
     * 初始化方法
     */
    const initCityPicker = () => {
      let initData = props.cityPickerLevel
      if(initData.length == 0){
        for(key in init){
          init[key] = true
        }
      }else{
        initData.forEach(item => {
          init[item] = true
        });
      }
    }

  
    //监听
    watch([
      () => resultData.provinceValue,
      () => resultData.cityValue,
      () => resultData.areaValue,
      () => resultData.streetValue,
      ],([province,city,area,street]) => {
      emit('update:cityPickerData',resultData)
    })

    onBeforeMount(()=>{
      //初始化
      initCityPicker();
      //获取省份
      getGrocince(); 
    })

    return {
      data,
      handleProvince,
      getGrocince,
      handleCity,
      handleArea,
      handleStreet,
      init
    };
  },
};
</script>

<style lang="scss" scoped>
</style>