import req from "../axios"; //连接接口文件


export const uploadImg = function (file) {
  return req("post", "file-service/image/upload", file);
};
