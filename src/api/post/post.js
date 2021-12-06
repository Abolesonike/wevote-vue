import req from "../axios"; //连接接口文件

// 测试
// 2021/10/26
export const test = function () {
  return req("get", "/post-service/post/test");
};

// 查询所有帖子
export const addPost = function (post, voteList) {
  return req("post", "/post-service/post/addPost", {
    post,
    voteList,
  });
};

// 根据id查找一个帖子
export const findById = function (id) {
  return req("get", "/post-service/post/findById", {
    id: id,
  });
};

// 查询所有帖子
export const postList = function (pageNum, pageSize) {
  return req("get", "/post-service/post/postList", {
    pageNum: pageNum,
    pageSize: pageSize,
  });
};

// 查询指定状态所有帖子
export const postListStatus = function (pageNum, pageSize, status) {
  return req("get", "/post-service/post/postListStatus", {
    pageNum: pageNum,
    pageSize: pageSize,
    status: status,
  });
};

// 改变指定帖子的状态
export const changeStatus = function (id, status) {
  return req("get", "/post-service/post/changeStatus", {
    id: id,
    status: status,
  });
};

// 从数据库物理删除
export const deletePost = function (id) {
  return req("delete", "/post-service/post/delete", {
    id: id,
  });
};
