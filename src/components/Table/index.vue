<template>
  <div>
    <!-- 表格 -->
    <el-table :data="data.tableData" border style="width: 100%" @selection-change="thatSelectCheckBox">
      <!-- 多选框 -->
      <el-table-column
        type="selection"
        width="55"
        v-if="data.tableConfig.selection"
      >
      </el-table-column>

      <!-- 文本 -->
      <template v-for="item in data.tableConfig.tHead">
        <!-- v-solt -->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          v-if="item.columnType === 'slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 文本渲染 -->
        <el-table-column
          v-else
          :key="item.field"
          :prop="item.field"
          :label="item.label"
        >
        </el-table-column>
      </template>
    </el-table>

    <div class="table-footer">
      <el-row>
        <el-col :span="4">  
              <slot name="tableFooterLeft"></slot>
        </el-col>
        <el-col :span="20">
          <!-- 分页 -->
          <el-pagination
            class="pull-right"
            v-if="data.tableConfig.paginationShow"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.currentPage"
            :page-sizes="pageData.pageSizes"
            :page-size="pageData.pageSize"
            :layout="data.tableConfig.paginationlayout"
            :total="pageData.total"
            background
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
import { LoadData } from "./tableLoadData";
import { pagination } from "./paginationHook";
export default {
  name: "TableVue",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    tableRow:{
      type:Object,
      default: () => {},
    }
  },
  setup(props, { root,emit }) {
    //加载数据
    const { tableData, tableLoadData } = LoadData();

    //页码
    const {
      pageData,
      handleCurrentChange,
      handleSizeChange,
      totalCount,
    } = pagination();

    /**定义数据 */
    const data = reactive({
      tableConfig: {
        selection: true,
        tHead: [],
        requestData: "",
        paginationlayout: "total, sizes, prev, pager, next, jumper",
        paginationShow: true,
      },
      tableData: [],
    });

    /**定义方法 */

    //初始化Table配置项
    const initTableConfig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableConfig);

      for (let key in configData) {
        if (keys.includes(key)) {
          data.tableConfig[key] = configData[key];
        }
      }
    };

    //勾选checkBox触发
    const thatSelectCheckBox = (val) => {
      let rowData ={
        idItem:val.map(item => item.id),
      }
      emit('update:tableRow',rowData)
    }

    //刷新table数据
    const refreshData = ()=>{
      tableLoadData(data.tableConfig.requestData);
    }

    //带参数刷新数据
    const paramsLoadData = (params) => {
      // let requestData = Object.assign({},params,{
      //   pageNumber: 1,
      //   pageSize:10,
      // })
      // data.tableConfig.requestData.data = requestData
      // console.log(data.tableConfig.requestData);
      // console.log(params);
      tableLoadData(params)
      // console.log(tableData);
    }


    //监听单个对象
    // watch(() => tableData.item,(newValue,oldValue)=>{
    //   data.tableData = newValue
    // })

    //监听多个对象
    //数据渲染
    watch(
      [() => tableData.item, () => tableData.total],
      ([tableItem, tableTotal]) => {
        data.tableData = tableItem;
        totalCount(tableTotal);
      }
    );

    //页码监听
    watch(
      [() => pageData.currentPage, () => pageData.pageSize],
      ([currentPage, pageSize]) => {
        let requestData = data.tableConfig.requestData;
        if (requestData.data) {
          //赋值N
          requestData = data.tableConfig.requestData;
          //修改值
          requestData.data.pageNumber = currentPage;
          requestData.data.pageSize = pageSize;

          tableLoadData(data.tableConfig.requestData);
        }
      }
    );

    /**生命周期 */
    onBeforeMount(() => {
      initTableConfig();
      tableLoadData(data.tableConfig.requestData);
    });

    return {
      data,
      pageData,
      handleCurrentChange,
      handleSizeChange,
      thatSelectCheckBox,
      refreshData,
      paramsLoadData
    };
  },
};
</script>

<style lang="scss" scoped>
.table-footer{
  padding: 15px 0;
}
</style>