import req from "../axios"; //连接接口文件

// 添加一个角色
export const add = function (permsList, sysRole) {
  return req(
    "post",
    "/auth-service/sysRole/add?roleName=" +
      sysRole.roleName +
      "&roleDesc=" +
      sysRole.roleDesc,
    permsList
  );
};

// 分页查询所有
export const roleList = function (pageNum, pageSize) {
  return req("get", "/auth-service/sysRole/roleList", {
    pageNum: pageNum,
    pageSize: pageSize,
  });
};

// 查询所有
export const findAllByEnableStatus = function (enableStatus) {
  return req("get", "/auth-service/sysRole/findAll", {
    enableStatus: enableStatus,
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

// 给角色分配权限
export const selectAllRole = function (sysRole) {
  return req("post", "/auth-service/sysRole/selectAll", sysRole);
};

// 检查角色是否已经被分配给角色
export const checkIsAssigned = function (roleId) {
  return req("get", "/auth-service/sysRole/checkIsAssigned", {
    roleId: roleId,
  });
};

// 更新角色数据
export const update = function (sysRole) {
  return req("put", "/auth-service/sysRole/update", sysRole);
};
