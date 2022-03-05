import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";

//创建axios的一个实例
const instance = axios.create({
  baseURL: "http://localhost:80", //接口统一域名
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
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    //console.log(error);
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
