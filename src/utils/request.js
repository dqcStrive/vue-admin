import axios from 'axios'
import {Message} from 'element-ui'
import {getToken,getUserName} from './app'

//创建axios，赋值geiservice
//手把手前端地址http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
  baseURL: BASEURL,//http://localhost:8080/api/
  timeout: 15000,
});


//添加请求拦截器
service.interceptors.request.use(function(config){
  //在发送请求之前做些什么
  //Tokey
  //userId
  //sui
  config.headers['Tokey'] = getToken()
  config.headers['UserName'] = getUserName()
  return config;
},function(error){
    //对请求错误做些什么
    return Promise.reject(error);
});

//添加响应拦截器
service.interceptors.response.use(function(response){
  //对响应数组做些什么
  let data = response.data
  if(data.resCode !== 0){
    Message.error(data.message);
    return Promise.reject(data);
  }else{
   return response;
  }

},function(error){
  //对响应错误做些什么
  return Promise.reject(error);
});

export default service;
