import { reactive } from "@vue/composition-api"

export function pagination(){
  /**
   * @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
   */

    const pageData = reactive({
      currentPage:1,
      pageSize:10,
      total:50,
      pageSizes:[10, 20, 50, 100]
    })

    //统计数据总和
    const totalCount = (value) => {
      pageData.total = value
    }

    const handleSizeChange = (val) => {
      pageData.pageSize = val
    }
    const handleCurrentChange = (val) => {
      pageData.currentPage = val
    }

    return{
      pageData,
      handleCurrentChange,
      handleSizeChange,
      totalCount
    }

}