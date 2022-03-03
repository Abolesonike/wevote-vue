import req from "../axios"; //连接接口文件

// 获取评论
export const getComment = function (postId) {
  return req("get", "comment-service/comment/commentList", { id: postId });
};

// 发送评论
export const sendComment = function (comment) {
  return req("post", "comment-service/comment/sendComment", comment);
};
