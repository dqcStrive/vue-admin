<template>
  <div >
    <el-row>
      <el-col :span="21">
        <div class="label-wrap">
          <label for="">关键字：</label>
          <div class="warp-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <SelectVue :config="data.configOption" :selectData.sync="data.selectData"></SelectVue>
              </el-col>
              <el-col :span="5">
                <el-input v-model="data.keyWord" placeholder="请输入搜索关键字"></el-input>
              </el-col>
              <el-col :span="15">
                <el-button type="danger"  @click="search">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <el-button type="danger" class="poll-right" @click="handlerEdit">添加用户</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <TableVue ref="userTable" :config="data.configTable" :tableRow.sync="data.tableRow">
      <!-- 插槽 -->
      <template v-slot:status="slotData">
        <el-switch @change="handlerSwitch(slotData.data)" v-model="slotData.data.status" active-value="2" inactive-value="1"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="small" type="danger" @click="DelUser(slotData.data)">删除</el-button>
        <el-button size="small" type="primary" @click="handlerEdit(slotData.data)">编辑</el-button>
      </template>
      <template v-slot:tableFooterLeft>
        <el-button size="small" type="" @click="handlerBatchDel">批量删除</el-button>
      </template>
      <!-- 插槽 -->
    </TableVue>

    <DialogAdd :flag.sync="data.dialog_add" :editData="data.editData" @refreshData='refreshData'></DialogAdd>
  </div>
</template>

<script>
import { reactive,ref } from '@vue/composition-api';
import SelectVue from '@c/Select';
import TableVue from '@c/Table';
import DialogAdd from './dialog/add';
import { DeleteUser,UserActives } from '@/api/user'
import { global } from "@/utils/global";
export default {
  name:'UserIndex',
  components:{ SelectVue, TableVue, DialogAdd },
  setup(porps,{root,refs}){

    const { confirm } = global();

    const data = reactive({
      dialog_add:false,
      configOption: {
        init:['truename','phone','username'],
      },
      configTable:{
        //多选框
        selection: true,
        //表头
        tHead:[
          { 
            label: "邮箱/用户名",
            field: 'username'
          },
             { 
            label: "真实姓名",
            field: 'truename'
          },
             { 
            label: "手机号",
            field: 'phone'
          },
             { 
            label: "地区",
            field: 'region'
          },
             { 
            label: "角色",
            field: 'role'
          },
          {
            label: '禁启用状态',
            field: 'status',
            columnType: 'slot',
            slotName: 'status'
          },
          {
            label: '操作',
            columnType: 'slot',
            slotName: 'operation'
          },
        ],
        // 请求接口Url
        requestData: {
          url: 'getUserList',
          method: 'post',
          data:{
            pageNumber:1,
            pageSize:10
          }
        },
        paginationlayout:'total, sizes, prev, pager, next, jumper',
        paginationShow: true,
      },
      //table选择数据
      tableRow:{},
      //阻止状态
      updateUserStatusFlag: false,
      //编辑数据
      editData:{},
      //下拉数据
      selectData:{},
      //关键字数据
      keyWord: ``,
    })

    /**定义方法 */
    //编辑
    const handlerEdit = (params) => {
      data.dialog_add = true
       //子组件赋值
      data.editData = Object.assign({},params)
    }

    //单点删除
    const DelUser =(params) => {
      data.tableRow.idItem = [params.id];
      confirm({
        content: '确认删除选中数据？？？',
        tip: '警告',
        fn: userDelete
      })
      refreshData()
    }

    //批量删除
    const handlerBatchDel = () =>{
      let user = data.tableRow
      if(!user || user.length === 0){
        root.$message({
          message: '请选择要删除的用户！！',
          type: 'error'
        })
        return false
      }
      confirm({
        content: '确认删除选中数据？？？',
        tip: '警告',
        fn: userDelete
      })

    }

    //删除用户
    const userDelete = () => {
      DeleteUser({id: data.tableRow.idItem}).then(res => {
        refreshData()
      })
    }

    //刷新数据
    const refreshData = () => {
        refs.userTable.refreshData()
    }

    //禁启用户
    const handlerSwitch = (params) =>{
      
      let requestData = {
        id: params.id,
        status: params.status
      }
      UserActives(requestData).then(res => {
        if(data.updateUserStatusFlag) return false
        data.updateUserStatusFlag = true
        root.$message({
          message: res.data.message,
          type: 'success'
        })
        data.updateUserStatusFlag = !data.updateUserStatusFlag
      })
    }

    //搜索用户
    const search =() => {
      let requestData = {
        url: 'getUserList',
          method: 'post',
          data:{
            pageNumber:1,
            pageSize:10,
            [data.selectData.value]:data.keyWord
          }
      }
      refs.userTable.paramsLoadData(requestData)
    }

    return{
      data,
      handlerEdit,
      handlerBatchDel,
      DelUser,
      refreshData,
      handlerSwitch,
      search
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
  .label-wrap {
     @include labelDom(left, 60, 40);
  }
</style>