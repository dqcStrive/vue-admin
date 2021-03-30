const path = require('path');
module.exports = {
  lintOnSave: false,
  css:{
    loaderOptions:{
      sass:{
        prependData: '@import "@/styles/main.scss";'
      }
    }
  },
  configureWebpack:(config) => {
    config.resolve = {//配置解析别名
      extensions:['.js','.json','.vue'],//自动添加文件名后缀
      alias:{
        '@': path.resolve(__dirname,'./src'),
        // 'public':path.resolve(__dirname,'./public'),
        '@c':path.resolve(__dirname,'./src/components'),
        // 'common':path.resolve(__dirname,'./src/common'),
        // 'api':path.resolve(__dirname,'./src/api'),
        // 'views':path.resolve(__dirname,'./src/views'),
        // 'data':path.resolve(__dirname,'./src/data'),
      }
    }
  }
}