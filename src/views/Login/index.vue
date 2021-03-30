<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{ current: item.current }" v-for="(item, index) in menuTab" :key="index" @click="toggleMenu(item)">
          {{ item.text }}
        </li>
      </ul>
      <!-- 表单开始 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
        
        <el-form-item prop="userName" class="item-form">
          <label for="">邮箱</label>
          <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="passWord" class="item-form">
          <label for="">密码</label>
          <el-input type="password" v-model="ruleForm.passWord" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

         <el-form-item prop="passWords" class="item-form" v-show="model === 'register'">
          <label for="">重复密码</label>
          <el-input type="password" v-model="ruleForm.passWords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form" >
          <label for="">验证码</label>
          <el-row :gutter="11">
            <el-col :span="14"> <el-input type="text" v-model="ruleForm.code" autocomplete="off" minlength="6" maxlength="6"></el-input></el-col>
            <el-col :span="10"><el-button type="success" class="block">获取验证码</el-button></el-col>
          </el-row>  
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script>
import {stripscript,validataEmail,validataPassword,validataCode} from '@/utils/validata';
export default {
  data() {
    //验证验证码
    var code = (rule, value, callback) => {
        //过滤后数据
        this.ruleForm.code = stripscript(value);
        value = this.ruleForm.code;

        if (value === '') {
          return callback(new Error('验证码不能为空'));
        }else if(validataCode(value)){
          return callback(new Error('验证码格式有误'));
        }else{
          callback();
        }

      };
      //验证用户名
      var userName = (rule, value, callback) => {
       
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validataEmail(value)){
          callback(new Error('用户名格式有误'));
        }else{
          callback();
        }
      };
      //验证密码
      var passWord = (rule, value, callback) => {
        //过滤后数据
        this.ruleForm.passWord = stripscript(value);
        value = this.ruleForm.passWord;

        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validataPassword(value)) {
          callback(new Error('密码为6至20为数字+字母'));
        } else {
          callback();
        }
      };

      //验证重复密码
      var passWords = (rule, value, callback) => {
        //如果模块值为login，直接通过
        if(this.model === 'login'){callback()}

        //过滤后数据
        this.ruleForm.passWords = stripscript(value);
        value = this.ruleForm.passWords;

        if (value === '') {
          callback(new Error('请再次密码'));
        } else if (value != this.ruleForm.passWord ) {
          callback(new Error('重复密码不正确'));
          
        } else {
          callback();
        }
      };
    return {
      menuTab: [
        {
          text: "登录",
          current: true,
          type: 'login'
        },
        {
          text: "注册",
          current: false,
          type: 'register'
        },
      ],
      isActive: true,
      //模块值
      model:'login',
      ruleForm: {
        userName: "",
        passWord: "",
        passWords: "",
        code: "",
      },
      rules: {
        userName: [{ validator: userName, trigger: "blur" }],
        passWord: [{ validator: passWord, trigger: "blur" }],
        passWords: [{ validator: passWords, trigger: "blur" }],
        code: [{ validator: code, trigger: "blur" }],
      },
    };
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach((elem) => {
        elem.current = false;
      });
      data.current = true;
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form{
  margin-top: 29px;
  label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form{
    margin-bottom: 13px;
  }
  .block{
    display: block;
    width: 100%;
  }
  .login-btn{
    margin-top: 19px;
  }
}
</style>