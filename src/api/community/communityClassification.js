import req from "../axios"; //连接接口文件

// 条件查询分类
export const selectCommClassification = function (classification) {
  return req(
    "post",
    "/post-service/communityClassification/select",
    classification
  );
};

// 更新
export const updateCommClassification = function (classification) {
  return req(
    "put",
    "/post-service/communityClassification/update",
    classification
  );
};

// 插入
export const insertOneClassification = function (classification) {
  return req(
    "post",
    "/post-service/communityClassification/insertOne",
    classification
  );
};

// 删除
export const deleteOneClassification = function (classification) {
  return req("delete", "/post-service/communityClassification/deleteOne", {
    id: classification,
  });
};
