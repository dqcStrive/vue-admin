<template>
  <el-select v-model="data.selectiValue" placeholder="请选择" @change="select">
    <el-option 
      v-for="item in data.initOption" 
      :key="item.value" 
      :value="item.value" 
      :label="item.label"
      >
    </el-option>
  </el-select>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
export default {
  name: '',
  props:{
    config:{
      type: Object,
      default:() => {}
    },
    selectData:{
      type: Object,
      default:() => {}
    }
  },
  setup(props,{root,emit}){
    const data = reactive({
      selectiValue: '',
      initOption:[],
      option:[
        { value: 'phone', label: '手机号' },
        { value: 'truename', label: '姓名' },
        { value: 'username', label: '邮箱' },
        { value: 'title', label: '标题' },
        { value: 'id', label: 'ID' },
      ],
    });

    /**定义方法 */
    
    //初始化下拉选择
    let initOption = () =>{
      let initData = props.config.init;
      let optionArr = [];
      //数据校验
      if(initData.length === 0){
        return false;
      }
      initData.forEach(item => {
        let arr = data.option.filter(elem => elem.value == item);
        if(arr.length > 0){
          optionArr.push(arr[0]);
        }

      });
      //数据校验
      if(optionArr.length === 0){
        return false;
      }
      //初始化赋值
      data.initOption = optionArr;
      //初始化搜索类型
      // data.selectiValue = optionArr[0].value
    }

    //选择触发
    const select =(val) => {
      let filterData = data.option.filter(item => item.value ==val)[0]
      emit("update:selectData",filterData)
    }

    /**生命周期 */

    onMounted(() => {
      initOption()
    })

    return{
      data,
      select
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
