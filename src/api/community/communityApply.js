import req from "../axios"; //连接接口文件

// 条件查询分类
export const selectCommApply = function (pageNum, pageSize, communityApply) {
  return req(
    "post",
    "/post-service/communityApply/select?pageNum=" +
      pageNum +
      "&pageSize=" +
      pageSize,
    communityApply
  );
};

// 插入
export const insertCommApply = function (communityApply) {
  return req("post", "/post-service/communityApply/insert", communityApply);
};

// 删除
export const deleteCommApply = function (communityApply) {
  return req("delete", "/post-service/communityApply/delete", communityApply);
};

export const applyAgree = function (communityApply) {
  return req("post", "/post-service/communityApply/agree", communityApply);
};

export const applyDisagree = function (communityApply) {
  return req("post", "/post-service/communityApply/disagree", communityApply);
};
