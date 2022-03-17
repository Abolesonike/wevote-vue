import req from "../axios"; //连接接口文件

// 查询
export const esSearch = function (keyword, pageNum, pageSize) {
  //console.log(keyword);
  return req("get", "/post-service/es/queryMultiMatchDataPage", {
    keyword: keyword,
    pageNum: pageNum,
    pageSize: pageSize,
  });
};
