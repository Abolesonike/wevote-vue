import req from "../axios"; //连接接口文件

// 条件查询分类
export const selectNotice = function (pageNum, pageSize, notice) {
  return req(
    "post",
    "/post-service/notice/select?pageNum=" + pageNum + "&pageSize=" + pageSize,
    notice
  );
};

// 插入
export const insertNotice = function (notice) {
  return req("post", "/post-service/notice/insert", notice);
};

// 删除
export const deleteNotice = function (notice) {
  return req("post", "/post-service/notice/delete", notice);
};

// 修改
export const updateNotice = function (notice) {
  return req("put", "/post-service/notice/update", notice);
};
