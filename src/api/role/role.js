import req from "../axios"; //连接接口文件

// 分页查询所有
export const roleList = function (pageNum, pageSize) {
  return req("get", "/auth-service/sysRole/roleList", {
    pageNum: pageNum,
    pageSize: pageSize,
  });
};

// 给角色分配权限
export const assignPermissions = function (permsList, roleId) {
  return req(
    "post",
    "/auth-service/rolePerms/assignPermissions?roleId=" + roleId,
    permsList
  );
};
