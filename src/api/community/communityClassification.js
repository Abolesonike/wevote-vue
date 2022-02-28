import req from "../axios"; //连接接口文件

// 查询所有启用的社区
export const getAllClassification = function (status) {
  return req("get", "/post-service/community/getAllClassification", {
    status: status,
  });
};
