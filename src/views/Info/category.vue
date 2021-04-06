<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type: 'category_first_add'})">添加一级分类</el-button>
    <hr style="margin: 30px -30px 30px -30px;">
    <div>
      <el-row :gutter="30">
        <el-col :span="10">
          <div class="category-wrap">
            <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{firstItem.category_name}}
                <div class="button-group">
                  <el-button size="mini" type="danger" @click="editCategory({data:firstItem,type: 'category_first_edit'})" round>编辑</el-button>
                  <el-button size="mini" type="primary" round @click="handlerAddChildren({data:firstItem,type: 'category_children_add'})">添加子集</el-button>
                  <el-button size="mini" round @click="deleteCategoryConfirm(firstItem.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="firstItem.children">
                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                  {{childrenItem.category_name}}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round >删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="menu-wrap">
            <h4 class="menu-title">
              一级分类编辑
            </h4>
            <el-form class="form-wrap" label-width="142px" ref="categoryForm">
              <el-form-item label="一级菜单名称：" v-if="category_first_input">
                <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
              </el-form-item>
              <el-form-item label="二级菜单名称："  v-if="category_children_input">
                <el-input v-model="form.setCategoryName" :disabled="category_children_disabled"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="submit" :loading="submit_button_loading" :disabled="submit_button_disabled">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { AddFirstCategory, GetCategory, DeleteCategory,EditCategory,AddChildrenCategory} from '@/api/news';
import { ref,reactive, onMounted,watch } from '@vue/composition-api';
import { global } from '@/utils/global';
import { common } from '@/api/common';
import SvgIcon from "../../icons/SvgIcon.vue";
import "../../styles/config.scss"
export default {
  components: { SvgIcon },
  name: "Info",
  setup(props,{root,refs}){
    //global
    const { confirm } = global();
    const { getInfoCategory,categoryItem } = common();

    /**定义基本数据 */
    const category_first_input = ref(true)
    const category_children_input = ref(true)
    const submit_button_loading = ref(false)
    const category_first_disabled = ref(true)
    const category_children_disabled = ref(true)
    const submit_button_disabled = ref(true)
    const deleteId = ref('')
    const submit_button_type = ref('')


    /**定义引用数据 */
    const form = reactive({
      categoryName: '',
      setCategoryName: ''
    })
    const category = reactive({
      item: [],
      current: []
    })

    /**定义方法 */

    //添加一级分类
    const submit = () => {
      if(submit_button_type.value == 'category_first_add'){
        addFirstCategory()
      }
      if(submit_button_type.value == 'category_first_edit'){
        editFirstCategory()
      }
      if(submit_button_type.value == 'category_children_add'){
        addChildrenCategory()
      }
    }

    const addFirstCategory = () => {
      if(form.categoryName === ''){
        root.$message({
          message: '分类名称不能为空',
          type: 'danger'
        })
        return false
      }
      //按钮加载状态
      submit_button_loading.value = true;
      let formName = {
        categoryName: form.categoryName || '',
        setCategoryName: form.setCategoryName || ''
      }
      AddFirstCategory(formName).then(res => {
        let data = res.data
        if(data.resCode === 0){
          root.$message({
            message:data.message,
            type: 'success'
          });
          category.item.push(res.data.data)
        }
        // refs.categoryForm.resetFields();
        form.categoryName = '';
        form.setCategoryName = '';
        submit_button_loading.value = false;
      }).catch(err => {
        submit_button_loading.value = false;
        // refs.categoryForm.resetFields();
        form.categoryName = '';
        form.setCategoryName = '';
      })
    }

    const addFirst = (params) =>{
      submit_button_type.value = params.type;
      category_first_input.value = true;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
    }

    const handlerAddChildren = (params) => {
      //更新确定按钮类型
      submit_button_type.value = params.type;
      //存储数据
      category.current = params.data
      //禁用一级输入框
      category_first_disabled.value = true
      //启用自己输入框
      category_children_disabled.value = false
      //启用按钮
      submit_button_disabled.value = false
      //显示子集输入框
      category_children_input.value = true
      //显示一级分类文本
      form.categoryName =params.data.category_name
    }

    const addChildrenCategory =() =>{
      if(!form.setCategoryName){
        root.$message({
          message: '添加信息为空',
          type: 'error'
        })
        return false
      }
      let requestData = {
        categoryName:form.setCategoryName,
        parentId:category.current.id    
      }
      AddChildrenCategory(requestData).then(res => {
        let responseData = res.data;
        root.$message({
          message: responseData.message,
          type: 'success'
        })
        //带哦用分类接口
        getInfoCategory()
        //清空子集输入内容
        form.setCategoryName = ''
      })
    }

    //删除
    const deleteCategoryConfirm = (id) => {
      deleteId.value = id
      confirm({
        content: '确认删除当前信息？',
        tip: '警告',
        catchFn:() => {
          deleteId.value = '';
        },
        fn: deleCategory,
      })
    }


    const editFirstCategory = () =>{
      if(category.current.length == 0){
        root.$message({
          message: '未选择分类！！',
          type: 'error'
        })
        return false
      }
      let requestData = {
        id: category.current.id,
        categoryName: form.categoryName
      }
      EditCategory(requestData).then(res => {
        let resData = res.data
        root.$message({
          message: resData.message,
          type: 'success'
        })

        category.current.category_name = resData.data.data.categoryName;

        //清空输入框
        form.categoryName = ''
        category.current = []
      })
    }
    
    //修改
    const editCategory = (params) => {
      submit_button_type.value = params.type;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      form.categoryName = params.data.category_name
      category.current = params.data
    }

    const deleCategory = () => {  
      DeleteCategory({categoryId: deleteId.value}).then(res => {
        let index = category.item.findIndex(item => item.id == deleteId.value)
        category.item.splice(index,1);

      }).catch(err => {

      })
    }

    /**监听 */
    //获取分类
    watch(() => categoryItem.item, (value) => {
      category.item = value
    })

    /**生命周期 */

    //onMounted  Dom挂载完成

    onMounted(() => {
      getInfoCategory()
    })



    return{
      category_first_input,
      category_children_input,
      submit_button_loading,
      category_first_disabled,
      category_children_disabled,
      submit_button_disabled,
      form,
      submit,
      addFirst,
      category,
      deleteCategoryConfirm,
      editCategory,
      handlerAddChildren,
      addChildrenCategory
    }
  }
};
</script>

<style lang="scss" scoped>
#category {
  .category-wrap{
    div:first-child{
      &:before{
        top: 20px;
      }
    }
    div:last-child{
      &:before{
        bottom: 21px;
      }
    }
    .category {
      position: relative;
      line-height: 44px;
      cursor: pointer;
      &:before {
        content: "";
        position: absolute;
        left: 22px;
        top: 0px;
        bottom: 0;
        width: 32px;
        border-left: 1px solid #000;
      }
      h4 {
        padding-left: 40px;
        svg {
          position: absolute;
          left: 15px;
          top: 15px;
          font-size: 17px;
          background-color: #fff;
        }
      }

      li {
        position: relative;
        margin-left: 24px;
        padding-left: 36px;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 22px;
          width: 32px;
          border-bottom: 1px dotted #000;
        }
      }
      .button-group{
          position: absolute;
          right: 11px;
          top: -1px;
          display: none;
          button{font-size: 12px;}
        }
      li,h4{
        &:hover{
          @include webkit(transition,all .5s ease 0s);
          background-color: #f3f3f3;
          .button-group{
            display: block;
          }
        }
      }
    } 
  }
  .menu-wrap{
    .menu-title{
      line-height: 44px;
      background-color: #f3f3f3;
      padding-left: 22px;
    }
    .form-wrap{ 
      width: 410px;
      padding-top: 26px;
    }
  }
}
</style>