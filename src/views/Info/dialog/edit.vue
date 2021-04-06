<template>
  <div>
    <el-dialog
      title="修改"
      :visible.sync="dialog_info_flag"
      @close="close"
      width="580px"
      @opened="openDialog"
    >
      <el-form :model="form" ref="addInfoForm">
        <el-form-item label="标题：" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option
              v-for="item in categoryOption.item"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="概况：" :label-width="formLabelWidth" prop="content">
          <el-input
            type="textarea"
            v-model="form.content"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="submit" :loading="submitLoading">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
import { AddInfo,GetList,EditInfo } from "@/api/news";
export default {
  name: "Info_dialog",
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => {},
    },
    id:{
      type:String,
      default:""
    }
  },
  setup(props, { emit, root, refs }) {

    const data = {
      
    }
    /**定义引用数据 */
    const form = reactive({
      category: "",
      title: "",
      content: "",
    });

    const categoryOption = reactive({
      item: [],
    });

    /**定义基本数据 */
    const dialog_info_flag = ref(false);
    const formLabelWidth = ref("70px");
    const submitLoading = ref(false);

    /**定义函数 */
    const close = () => {
      dialog_info_flag.value = false;
      emit("update:flag", false);
      resetForm();
    };

    const openDialog = () => {

      categoryOption.item = props.category;
      getInfo()
      console.log(props.id);
    };

    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize:1,
        id:props.id
      }
      GetList(requestData).then(res => {
        let resquestData = res.data.data.data[0]
        form.category =  resquestData.categoryId
        form.title = resquestData.title
        form.content = resquestData.content
      })
    }

    const resetForm = () => {
      refs.addInfoForm.resetFields();
      // form.category = "";
      // form.title = "";
      // form.content = "";
    };

    const submit = () => {
      let requestData = {
        id:props.id,
        categoryId: form.category,
        title: form.title,
        content: form.content,
        imgUrl: "http://163",
        updateDate: new Date(),
      };
      console.log();
      if (form.category === '') {
        root.$message({
          message: "分类不能为空",
          type: "error",
        });
        return false;
      }
      submitLoading.value = true;
      EditInfo(requestData)
        .then((res) => {
          let data = res.data;
          root.$message({
            message: data.message,
            type: "success",
          });
          // refs['addInfoForm'].resetFields();
          submitLoading.value = false;
          emit("getList");
          resetForm();
        })
        .catch((err) => {
          submitLoading.value = false;
        });
    };

    /**watch */
    watch(props, (newProps, oldProps) => {
      dialog_info_flag.value = props.flag;
    });

    return {
      dialog_info_flag,
      formLabelWidth,
      form,
      close,
      openDialog,
      categoryOption,
      submit,
      submitLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>