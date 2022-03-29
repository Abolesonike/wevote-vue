import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";
import { ElMessage } from "element-plus";

//创建axios的一个实例
const instance = axios.create({
  baseURL: "http://47.108.113.58/:8080", //接口统一域名
  timeout: 10000, //设置超时
  withCredentials: true, // 允许携带 cookie
});

//------------------- 一、请求拦截器 忽略
instance.interceptors.request.use(
  function (config) {
    if (VueCookies.isKey("token")) {
      config.headers.token = VueCookies.get("token");
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//----------------- 二、响应拦截器 忽略
instance.interceptors.response.use(
  function (response) {
    if (response.data.code === 402) {
      router.push("/login").then((r) => r);
    }
    if (response.data.code === 401) {
      ElMessage.error(response.data.message);
    }
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    const dic = {
      "comment-service": "评论服务",
      "post-service": "投票服务",
      "auth-service": "认证服务",
      "file-service": "文件服务",
    };
    console.log(error.response);
    if (error.response.status === 503) {
      ElMessage.error(dic[error.response.data.path.split("/")[1]] + "不可用");
    }
    return Promise.reject(error);
  }
);

/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
 * 函数的参数及返回值如下：
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @returns {boolean}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
export default function (method, url, data = null) {
  method = method.toLowerCase();
  if (method === "post") {
    return instance.post(url, data);
  } else if (method === "get") {
    return instance.get(url, { params: data });
  } else if (method === "delete") {
    return instance.delete(url, { params: data });
  } else if (method === "put") {
    return instance.put(url, data);
  } else {
    console.error("未知的method" + method);
    return false;
  }
}
