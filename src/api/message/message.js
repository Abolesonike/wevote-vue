import req from "../axios"; //连接接口文件

// 条件查询分类
export const selectMessage = function (pageNum, pageSize, message) {
  return req(
    "post",
    "/post-service/message/select?pageNum=" + pageNum + "&pageSize=" + pageSize,
    message
  );
};

// 删除
export const deleteMessage = function (message) {
  return req("delete", "/post-service/message/delete", message);
};

// 修改
export const updateMessage = function (message) {
  return req("put", "/post-service/message/update", message);
};
