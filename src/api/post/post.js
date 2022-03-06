import req from "../axios"; //连接接口文件

// 测试
// 2021/10/26
export const test = function () {
  return req("get", "/post-service/post/test");
};

export const addPost = function (post, voteList, postUserId) {
  console.log(postUserId);
  return req("post", "/post-service/post/addPost", {
    post,
    voteList,
    postUserId,
  });
};

// 根据id查找一个帖子
export const findById = function (id) {
  return req("get", "/post-service/post/findById", {
    id: id,
  });
};

// 条件查询帖子
export const selectPostVo = function (pageNum, pageSize, post) {
  return req(
    "post",
    "/post-service/post/selectPostVo?pageNum=" +
      pageNum +
      "&pageSize=" +
      +pageSize,
    post
  );
};

// 改变指定帖子的状态
export const changeStatus = function (id, status, reason) {
  return req("get", "/post-service/post/changeStatus", {
    id: id,
    status: status,
    reason: reason,
  });
};

// 从数据库物理删除
export const deletePost = function (id) {
  return req("delete", "/post-service/post/delete", {
    id: id,
  });
};
