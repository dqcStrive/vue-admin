<template>
  <div>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
    <!-- 多选框 -->
    <el-table-column
      type="selection"
      width="55"
      v-if="tableConfig.selection"
      >
    </el-table-column>

    <!-- 文本 -->
    <template  v-for="item in tableConfig.tHead" >
      <!-- v-solt -->
      <el-table-column 
        :key="item.field" 
        :prop="item.field" 
        :label="item.label"
        v-if="item.columnType === 'slot'">
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 文本渲染 -->
      <el-table-column 
        v-else
        :key="item.field" 
        :prop="item.field" 
        :label="item.label">
      </el-table-column>
    </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="tableConfig.paginationShow"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="tableConfig.paginationlayout"
      :total="total"
      background
      >
    </el-pagination>
  </div>


</template>

<script>
import tableLoadData from '@/mixins/tableLoadData';
import pagination from '@/mixins/pagination';
export default {
  name: "TableVue",
  mixins:[tableLoadData,pagination],
  props:{
    config:{
      typr: Object,
      default: () => {}
    }
  },
  data(){
    return {
      tableConfig:{
        selection: true,
        tHead:[],
        requestData: '',
        paginationlayout:'total, sizes, prev, pager, next, jumper',
        paginationShow: true,
      },
      tableData: [],
    }
  },
  methods:{
    initTableConfig(){
      let configData = this.config;
      let keys = Object.keys(this.tableConfig);
      for(let key in configData){
        if(keys.includes(key)){
         this.tableConfig[key] = configData[key];
        }

      }
    }
  },
  beforeMount(){
    this.initTableConfig()
  },
};
</script>

<style lang="scss" scoped>
</style>