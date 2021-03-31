const path = require('path');
module.exports = {
  //基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  //输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  //规范
  lintOnSave: false,

  //webpack-dev-server相关配置
  devServer:{
    open: false,//编译完成是否打开网页
    host: '0.0.0.0',
    port: 8080,
    https: false,//编译失败时刷新页面
    hot: true,//热加载
    hotOnly: false,
    proxy:{//配置代理
      '/devApi':{
        target: 'http://www.web-jshtml.cn/productapi',
        changeOrigin: true,
        pathRewrite:{
          '^/devApi':''
        }
      }
    }
  },

  //css相关配置
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
  },


}