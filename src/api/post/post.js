import req from "../axios"; //连接接口文件


export const addPost = function (post, voteList, postUserId) {
  //console.log(postUserId);
  return req("post", "/post-service/post/addPost", {
    post,
    voteList,
    postUserId,
  });
};

// 根据id查找一个帖子
export const updatePost = function (post) {
  return req("post", "/post-service/post/update", post);
};

// 根据id查找一个帖子
export const findById = function (id) {
  return req("get", "/post-service/post/findById", {
    id: id,
  });
};

// 条件查询帖子
export const selectPostVo = function (pageNum, pageSize, order, post) {
  return req(
    "post",
    "/post-service/post/selectPostVo?pageNum=" +
      pageNum +
      "&pageSize=" +
      +pageSize +
      "&order=" +
      order,
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

// 改变指定帖子的状态
export const changeType = function (id, type) {
  return req("get", "/post-service/post/changeType", {
    id: id,
    type: type,
  });
};

// 从数据库物理删除
export const deletePost = function (id) {
  return req("delete", "/post-service/post/delete", {
    id: id,
  });
};

// 点赞
export const like = function (postId, userId, opType) {
  return req("get", "/post-service/post/like", {
    postId: postId,
    userId: userId,
    opType: opType,
  });
};

// 收藏
export const collection = function (postId, userId, opType) {
  return req("get", "/post-service/post/collection", {
    postId: postId,
    userId: userId,
    opType: opType,
  });
};

// 我的收藏
export const myCollection = function (pageNum, pageSize, userId) {
  return req("get", "/post-service/post/myCollection", {
    pageNum: pageNum,
    pageSize: pageSize,
    userId: userId,
  });
};

// 我的点赞
export const myLike = function (pageNum, pageSize, userId) {
  return req("get", "/post-service/post/myLike", {
    pageNum: pageNum,
    pageSize: pageSize,
    userId: userId,
  });
};

// 我的投票
export const myPost = function (pageNum, pageSize, userId) {
  return req("get", "/post-service/post/myPost", {
    pageNum: pageNum,
    pageSize: pageSize,
    userId: userId,
  });
};

