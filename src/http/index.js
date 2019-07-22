import axios from 'axios';
import config from '../config';
import qs from 'qs';
//默认对axios的设置
axios.defaults.baseURL = config.baseURL;
// token在登录之后设置到cookie或者设置到sessionStorage,或者设置到localStorage。在这里进行获取设置到get和post的头部。并且属性名是Authorization
// axios.defaults.headers.common['Authorization'] = token;
//设置post请求方式的数据传输为表单格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//拦截器
axios.interceptors.request.use((config)=>{ 
  if(config.method==='post'){
    config.data = qs.stringify(config.data);
  }
  // console.log(config);
  // console.log(config.method);
	return config;  
},(error)=>{    
	return Promise.reject(error);  
});
axios.interceptors.response.use((response)=>{
  // response是axios封装的响应的对象
  // console.log(response,'---');
 /*  { data:{
      status:200,
      message:'success',
      data:[]
    }, 
    status: 200, 
    statusText: "" 
  } 
  {
    data:[],
    status: 200, 
    statusText: "success" 
  }
  */
  response.status = response.data.status;
  response.statusText = response.data.message;
  response.data = response.data.data;
  return response;
},(error)=>{
    return Promise.reject(error);
});
  

export default axios;





