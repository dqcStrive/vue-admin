<template>
  <div id="info-wrap">
    <!-- gutter 间隔 -->
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="warp-content">
            <el-select v-model="category_value">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              v-model="date_value"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              style="width: 100%"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：</label>
          <div class="warp-content">
            <!-- <el-select v-model="select_key" style="width: 100%">
              <el-option
                v-for="item in search_option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <SelectVue :config="data.configOption" style="width: 100%"></SelectVue>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="search_keyWork"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%" @click="getList">搜索</el-button>
      </el-col>
      <!-- <el-col :span="3">
        &nbsp;
      </el-col> -->
      <el-col :span="2" :offset="3">
        <el-button type="danger" style="width: 100%" @click="dialog_info = true" v-if="btnPerm('info:add')">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <div class="black-space-30"></div>
    <el-table :data="table_data.item" border style="width: 100%" v-loading="loadingData" @selection-change="handleSelectTionChange">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="750"> </el-table-column>
      <el-table-column prop="categoryId" label="类型" width="127" :formatter="tocategory">
      </el-table-column>
      <el-table-column prop="createDate" label="日期" width="140" :formatter="toDate">
      </el-table-column>
      <el-table-column prop="user" label="管理员" width="115">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)" v-btnPerm="'info:del'" class="hiden-button">删除</el-button >
          <el-button type="success" size="mini" @click="editInfo(scope.row.id)" v-btnPerm="'info:edit'" class="hiden-button">编辑</el-button>
            <el-button type="success" size="mini" @click="detailed(scope.row)" v-btnPerm="'info:detailed'" class="hiden-button">编辑详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>

    <!-- 分页 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <el-button size="middle" @click="deleteAll">删除全部</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :current-page="1"
          background
          layout=" pager,total,prev,next,jumper,sizes"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <DialogInfo
      :flag.sync="dialog_info"
      :category="options.category"
    ></DialogInfo>
    <DialogEditInfo
      :flag.sync="dialog_info_edit"
      :category="options.category"
      :id="infoId"
      @getList="getList"
    ></DialogEditInfo>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/edit";
import { global } from "@/utils/global";
import { GetList,DeleteInfo } from "@/api/news";
import { formatDate } from '@/utils/common';
import SelectVue from '@c/Select'

export default {
  name: "Info",
  components: { DialogInfo,DialogEditInfo,SelectVue },
  setup(props, { root }) {
    const data = reactive({
      configOption: {
        init:['id','title'],
      }
    })
    const { confirm } = global();

    /**定义数据 */
    const options = reactive({
      category: [],
    });
    //搜索关键字
    const search_option = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" },
    ]);
    // 表格数据
    const table_data = reactive({
      item: [],
    });
    //页码
    const page = reactive({
      pageNumber: 1,
      pageSize:10
    })

    const dialog_info_edit = ref(false)
    const dialog_info = ref(false);
    const category_value = ref("");
    const date_value = ref("");
    const select_key = ref("id");
    const search_keyWork = ref("");
    const total = ref(0);
    const loadingData = ref(false);
    const deleteId = ref('');
    const infoId = ref('');

    /**定义函数 */
    const handleSizeChange = (val) => {
      page.pageSize = val
      getList()
    };

    const handleCurrentChange = (val) => {
      page.pageNumber = val
      getList()
    };

    const deleteItem = (row) => {
      deleteId.value = [row]
      confirm({
        content: "确认删除当前信息？",
        tip: "警告",
        fn: confirmDelete,
      });
    };
    const deleteAll = () => {
      if( !deleteId.value || deleteId.value.length == 0){
        root.$message({
          message: '请选择要删除的数据',
          type: 'error'
        })
        return false
      }
      confirm({
        content: "确认删除当前信息？",
        tip: "警告",
        fn: confirmDelete,
      });
    };

    const confirmDelete = (value) => {
      DeleteInfo({id:deleteId.value}).then(res => {
        deleteId.value = ''
        getList()
      }).catch(err => {
        
      })
    };

    const handleSelectTionChange = (val) => {
      let id = val.map(item => item.id);
      deleteId.value = id
    }

    const getInfoCategory = () => {
      //vuex
      root.$store.dispatch("common/getInfoCategory").then((res) => {
        options.category = res.data;
      });
    };

    const dateFormat = () => {
      let requestData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      };
      //分类id
      if(category_value.value){requestData.categoryId = category_value.value}
      //日期
      if(date_value.value.length > 0){
        requestData.startTiem = date_value.value[0]
        requestData.endTime = date_value.value[1]
      }
      //关键字
      if(search_keyWork.value){requestData[select_key.value] = search_keyWork.value}


      return requestData
    }

    const getList = () => {
      //单独处理数据
      let requestData = dateFormat()
      //加载状态
      loadingData.value = true
      GetList(requestData)
        .then((res) => {
          let data = res.data.data;
          //更新数据
          table_data.item = data.data;
          //更新页码
          total.value = data.total;
          loadingData.value = false
        })
        .catch((err) => {
          loadingData.value = false
        });
    };
    const toDate =(row,colimn,celValue,index) =>{
      return formatDate(row.createDate)
    }

    const tocategory = (row) =>{
      let category = row.categoryId;

      let categoryData = options.category.filter(item => {
        return item.id == category
      })
      if(categoryData.length == 0)return false

        return categoryData[0].category_name
    }

    const editInfo = (id) => {
      infoId.value = id
      dialog_info_edit.value = true
    }

    const detailed = (data) => {
      // 预先存值
      // root.$store.commit("infoDetailed/SET_ID", data.id);
      // root.$store.commit("infoDetailed/SET_TITLE", data.title);
      root.$store.commit("infoDetailed/UPDATE_STATE_VALUE", {
          id: {
              value: data.id,
              sessionKey: "infoId",
              session: true
          },
          title: {
              value: data.title,
              sessionKey: "infoTitle",
              session: true
          }
      });
    
      // 跳转页面
      root.$router.push({
          name: "InfoDetailed",
          params: {
              id: data.id, 
              title: data.title
          }
      })
    }



    /**生命周期 */

    onMounted(() => {
      //获取分类
      getInfoCategory();
      //获取列表
      getList();
    });

    return {
      options,
      category_value,
      date_value,
      search_option,
      select_key,
      search_keyWork,
      table_data,
      handleSizeChange,
      handleCurrentChange,
      dialog_info,
      deleteItem,
      deleteAll,
      total,
      page,
      loadingData,
      toDate,
      tocategory,
      handleSelectTionChange,
      getList,
      dialog_info_edit,
      editInfo,
      infoId,
      detailed,
      data
    };
  },
};
</script>

<style lang="scss">
@import "../../styles/config.scss";
#info-wrap {
  .label-wrap {
    &.category {
      @include labelDom(left, 60, 40);
    }
    &.date {
      @include labelDom(right, 93, 40);
    }
    &.key-work {
      @include labelDom(right, 99, 40);
    }
  }
}
</style>
<style>
button.hiden-button { display: none; }
button.show-button { display: inline-block; }
</style>