import req from "../axios"; //连接接口文件
import qs from "qs";

// 发送登录数据
export const login = function (data) {
  return req("post", "auth-service/login", qs.stringify(data));
};
