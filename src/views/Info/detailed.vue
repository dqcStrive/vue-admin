<template>
  <el-form ref="form" :model="form" label-width="120px">

  <el-form-item label="信息分类">
    <el-select placeholder="请选择" v-model="form.categoryId">
      <el-option v-for="item in data.category" :key="item.id" :value="item.id" :label="item.category_name"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="新闻标题">
    <el-input v-model="form.title" placeholder=""></el-input>
  </el-form-item>

  <el-form-item label="缩略图">
    <Uploading :imgUrl.sync="form.imgUrl" :config="uploadImgConfig"></Uploading>
  </el-form-item>

  <el-form-item label="发布日期">
    <el-date-picker 
      v-model="form.createDate" 
      type="date" 
      placeholder="date"
      disabled
      >
    </el-date-picker>
  </el-form-item>

  <el-form-item label="详细内容">
    <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption"></quillEditor>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submit" :loading="data.submitLoading">保存</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import { ref,reactive,onMounted } from '@vue/composition-api';
import { GetList, EditInfo } from '@/api/news';
import { formatDate } from '@/utils/common';
import  Uploading from '@c/Uploading'
//富文本编辑器
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: 'InfoDetail',
  components:{quillEditor,Uploading},
  setup(props,{root}) {

    /**定义数据 */
    //图片上传配置
    const uploadImgConfig = reactive({
      action: 'http://up-z2.qiniup.com',
      ak:'tPxkQ_tl67uLcWwL6CUCMO9rdt7LBehl-Phe6f__',
      sk:'DN4uh-VE2olT8-j5Oaq7BuuX79Fml_jFakw6NNQZ',
      buckety: 'dqcimg'
    })
    const data = reactive({
      id: root.$route.params.id || root.$store.getters['infoDetailed/infoId'],
      category:[],
      editorOption: {},
      submitLoading: false,
    });
    const form = reactive({
        categoryId:'',
        title: '',
        createDate: '',
        content: '',
        imgUrl: ''
      })



    /**定义函数 */

    //获取信息分类
    const getInfoCategory = () =>{
      root.$store.dispatch('common/getInfoCategory').then(res => {
        data.category = res.data
      })
    }

    //获取当前id信息
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize:1,
        id: data.id
      }
      GetList(requestData).then(res => {
        let resquestData = res.data.data.data[0]
        form.categoryId =  resquestData.categoryId
        form.title = resquestData.title
        form.content = resquestData.content
        form.createDate = formatDate(resquestData.createDate)
        form.imgUrl = resquestData.imgUrl;
      })
    }

    //保存信息 
    const submit = () => {
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
        imgUrl: form.imgUrl,
        updateDate: new Date(),
      };
      data.submitLoading = true;

      EditInfo(requestData)
        .then((res) => {
          let data = res.data;
          root.$message({
            message: data.message,
            type: "success",
          });
          data.submitLoading = false;
         
        })
        .catch((err) => {
          data.submitLoading = false;
        });
    };




    /**生命周期 */

    onMounted(()=>{
      //获取信息分类
      getInfoCategory()
      //获取当前id信息
      getInfo()

    })


    return{
      form,
      data,
      submit,
      uploadImgConfig
    }
  },
}
</script>

<style lang="scss" scoped>

</style>