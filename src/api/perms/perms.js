import req from "../axios"; //连接接口文件

// 分页查询所有
export const permsList = function (pageNum, pageSize) {
  return req("get", "/auth-service/sysPerms/permsList", {
    pageNum: pageNum,
    pageSize: pageSize,
  });
};
