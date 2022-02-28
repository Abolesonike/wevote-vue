import req from "../axios"; //连接接口文件

// 创建社区
export const createCommunity = function (community) {
  return req("post", "/post-service/community/createCommunity", community);
};

// 条件查询社区
export const select = function (community) {
  return req("post", "/post-service/community/select", community);
};
