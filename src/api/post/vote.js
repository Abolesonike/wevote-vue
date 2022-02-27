import req from "../axios"; //连接接口文件

export const findById = function (id) {
  return req("get", "/post-service/vote/findById", { id: id });
};

export const findByIds = function (ids) {
  return req("get", "/post-service/vote/findByIds", { ids: ids });
};

export const voteFor = function (vote) {
  //console.log(vote);
  return req("post", "/post-service/vote/voteFor", vote);
};
