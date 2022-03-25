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
export const selectCommAdmin = function (pageNum, pageSize, communityId, user) {
  return req(
    "post",
    "/post-service/community/selectCommAdmin?pageNum=" +
      pageNum +
      "&pageSize=" +
      pageSize +
      "&communityId=" +
      communityId,
    user
  );
};

// 查询社区的所有用户
export const managerCommunity = function (pageNum, pageSize, userId) {
  return req("get", "/post-service/community/managerCommunity", {
    pageNum: pageNum,
    pageSize: pageSize,
    userId: userId,
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

// 删除
export const deleteOne = function (communityId) {
  return req("delete", "/post-service/community/delete", {
    id: communityId,
  });
};

// 检查用户是否加入社区
export const checkIsJoined = function (communityId, userId) {
  return req("get", "/post-service/community/checkIsJoined", {
    communityId: communityId,
    userId: userId,
  });
};

// 改变社区角色
export const changeCommunityRole = function (communityAdmin) {
  return req(
    "post",
    "/post-service/community/changeCommunityRole",
    communityAdmin
  );
};

// 移除社区成员
export const removeMember = function (communityAdmin) {
  return req("post", "/post-service/community/removeMember", communityAdmin);
};

// 修改社区封面
export const changeCover = function (communityCovers) {
  return req("put", "/post-service/community/changeCover", communityCovers);
};

// 修改社区介绍
export const changeIntroduction = function (community) {
  return req("put", "/post-service/community/changeIntroduction", community);
};
