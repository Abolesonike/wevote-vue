import req from "../axios"; //连接接口文件

// 获取评论
export const getComment = function (postId) {
  return req("get", "comment-service/comment/commentList", { id: postId });
};

// 发送评论
export const sendComment = function (comment) {
  return req("post", "comment-service/comment/sendComment", comment);
};

// 条件查询帖子
export const selectComment = function (pageNum, pageSize, comment) {
  return req(
    "post",
    "/comment-service/comment/select?pageNum=" +
      pageNum +
      "&pageSize=" +
      +pageSize,
    comment
  );
};


// 发送评论
export const changeCommentStatus = function (id, status, reason) {
  return req("get", "comment-service/comment/changeStatus", {
    id: id,
    status: status,
    reason: reason,
  });
};
