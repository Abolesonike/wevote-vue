import req from "../axios"; //连接接口文件

// 创建社区
export const createCommunity = function (community) {
  return req("post", "/post-service/community/createCommunity", community);
};

// 查询用户加入的社区
export const selectUserJoinedComm = function (userId) {
  return req("get", "/post-service/community/selectUserJoinedComm", {
    userId: userId,
  });
};

// 查询社区的所有用户
export const selectCommAdmin = function (communityId) {
  return req("get", "/post-service/community/selectCommAdmin", {
    communityId: communityId,
  });
};

// // 条件查询社区
// export const select = function (community) {
//   return req("post", "/post-service/community/select", community);
// };

// 条件查询社区
export const select = function (pageNum, pageSize, community) {
  return req(
    "post",
    "/post-service/community/select?pageNum=" +
      pageNum +
      "&pageSize=" +
      +pageSize,
    community
  );
};

// 更新
export const update = function (community) {
  return req("put", "/post-service/community/update", community);
};

// 条件查询社区
export const deleteOne = function (communityId) {
  return req("delete", "/post-service/community/delete", {
    id: communityId,
  });
};
