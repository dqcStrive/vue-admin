<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialog_info_flag"
      @close="close"
      width="580px"
      @opened="openDialog"
    >
      <el-form :model="data.form" ref="addInfoForm" :rules="data.rules">

        <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
          <el-input v-model="data.form.username" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="data.form.password" placeholder="请输入6~20数字+字母"></el-input>
        </el-form-item>

        <el-form-item label="姓名：" :label-width="formLabelWidth" prop="truename">
          <el-input v-model="data.form.truename" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model.number="data.form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="地区：" :label-width="formLabelWidth" prop="region">
          <CityPicker :cityPickerLevel="['province','city','area','street']" :cityPickerData.sync="data.cityPickerData"></CityPicker>
        </el-form-item>

        <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
          <el-radio v-model="data.form.status" label="1">禁用</el-radio> 
          <el-radio v-model="data.form.status" label="2">启用</el-radio> 
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-checkbox-group v-model="data.form.role">
            <el-checkbox v-for="item in data.roleItem" :key="item.role" :label="item.role">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="submit('addInfoForm')" :loading="submitLoading">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sha1  from 'js-sha1';
import { reactive, ref, watch } from "@vue/composition-api";
import CityPicker from '@c/CityPicker';
import { GetRole, AddUser,UserEdit } from '@/api/user';
import { stripscript, validatePass, validateEmail } from '@/utils/validata';
export default {
  name: "Info_dialog",
  components: {CityPicker},
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    editData:{
      type: Object,
      default:() => {},
    }

  },
  setup(props, { emit, root, refs }) {

      // 验证用户名
      const validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback(); //true
        }
      };
      // 验证密码
      const validatePassword = (rule, value, callback) => {
        // 过滤后的数据

        if(data.form.id && !value){
          callback();
        }
        if((data.form.id && value) || !data.form.id){
          if(value){
          data.form.password = stripscript(value);
          value = data.form.password;
        }
          if (value === '') {
            callback(new Error("请输入密码"));
          } else if (validatePass(value)) {
            callback(new Error("密码为6至20位数字+字母"));
          } else {
            callback();
          }
        }

      };

    /**定义基本数据 */
    const dialog_info_flag = ref(false);
    const formLabelWidth = ref("90px");
    const submitLoading = ref(false);

    const data = reactive({
      //城市数据
      cityPickerData:{},
      roleItem: [],
      form:{
        username: '',
        password: '',
        truename: '',
        phone: '',
        region: '',
        status: '1',
        role: []
      },
       // 表单的验证
      rules:reactive({
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        role: [
          { required: true, message:'请选择角色', trigger: 'change' }
        ],
      }),
    });

    /*******定义函数 */


    const close = () => {
      dialog_info_flag.value = false;
      emit("update:flag", false);
      resetForm();
    };


    const resetForm = () => {
      data.cityPickerData = {}
      refs.addInfoForm.resetFields();
    };

    const submit = (formName) => {
      refs[formName].validate((valid) => {
        // 表单验证通过
        if (valid) {            
          //数据处理   
          let requestData = Object.assign({},data.form);

          requestData.role = requestData.role.join('');
          requestData.region = JSON.stringify(data.cityPickerData);

          if(requestData.id){
            if(requestData.password){
              sha1(requestData.password)
            }else{
              delete requestData.password
            }
            userEdit(requestData)
          }else{
            requestData.password = sha1(requestData.password)
            userAdd(requestData)
          }

          } else {
            console.log('error submit!!');
            return false;
          }
      })
    };

    const userAdd = (requestData)=>{
      AddUser(requestData).then(res => {
        root.$message({
          message:res.data.message,
          type: 'success'
        })
        close();
        emit('refreshData');
        })
    }
    const userEdit = (requestData)=>{
      UserEdit(requestData).then(res => {
        root.$message({
          message:res.data.message,
          type: 'success'
        })
        close();
        emit('refreshData');
        })
    }


      

    //弹窗打开，动画结束时
    const openDialog = () => {
      //角色请求
      getRole()
      //初始值处理
     
      let editData = props.editData;
      if(editData.id){//编辑
        editData.role = editData.role.split(',');
        console.log(111);
      }else{
        console.log(222);
        data.form.id && delete data.form.id
      }
      // 循环JSON对象
      for(let key in editData){
        data.form[key] = editData.id ? editData[key] : '';
      }
      console.log(data.form);
    };


    /**请求角色 */
    const getRole = () => { 
      GetRole().then(res => {
        data.roleItem = res.data.data
      })
    }


    /**watch */
    watch(props, (newProps, oldProps) => {
      dialog_info_flag.value = props.flag;
    });


    return {
      dialog_info_flag,
      formLabelWidth,
      close,
      openDialog,
      submit,
      submitLoading,
      data
    };
  },
};
</script>

<style lang="scss" scoped>
</style>