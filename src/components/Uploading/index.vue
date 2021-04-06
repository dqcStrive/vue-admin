<template>
  <el-upload
    class="avatar-uploader"
    :action='config.action'
    :data="data.uploadKey"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="data.image" :src="data.image" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { QiniuToken } from '@/api/common'
import { onMounted, reactive, watch } from '@vue/composition-api'
export default {
  name: 'Uploading',
  components:{QiniuToken},
  props:{
    imgUrl:{
      type:String,
      default: ''
    },
    config:{
      type:Object,
      default:() => {}
    }
  },
  setup(props,{root,emit}){
    
    const data = reactive({
      image: '',
      uploadKey:{
        token: '',
        key: '',
      }
    })

    /**定义函数 */

    //缩略图 
    const handleAvatarSuccess = (res, file) => {
      let img = `${root.$store.getters['common/QiniuUrl']}${res.key}`
      data.image = img
      emit('update:imgUrl',img)
    }
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        root.$message.error('上传头像图片大小不能超过 2MB!');
      }

      //文件名转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`)
      data.uploadKey.key = key;
      return isJPG && isLt2M;
    }
    //获取七牛云Token
    const getqiniuToken = () => {
      // let requestData = {
      //   'ak':'Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj',
      //   'sk':'l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw',
      //   'buckety': 'webjshtml'
      // }
      let requestData = {
        ak:props.config.ak,
        sk:props.config.sk,
        buckety: props.config.buckety
      }
      QiniuToken(requestData).then(res => {
        data.uploadKey.token = res.data.data.token
      }).catch(err => {

      })
    }

    /**监听 */
    watch(()=>props.imgUrl,(value)=>{
      data.image = value
    })

    onMounted(() => {
      //获取七牛云信息
      getqiniuToken()
    })

    return{
      data,
      handleAvatarSuccess,
      beforeAvatarUpload,
    }
  }
}
</script>

<style lang="scss" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>