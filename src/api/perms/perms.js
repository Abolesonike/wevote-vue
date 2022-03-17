import req from "../axios"; //连接接口文件

// 添加权限
export const addPerms = function (sysPerms) {
  return req("post", "/auth-service/sysPerms/add", sysPerms);
};

// 删除一条
export const deletePerms = function (permsId) {
  return req("delete", "/auth-service/sysPerms/delete", { permsId: permsId });
};

// 分页查询所有
export const permsList = function (pageNum, pageSize) {
  return req("get", "/auth-service/sysPerms/permsList", {
    pageNum: pageNum,
    pageSize: pageSize,
  });
};

// 分页查询所有一级权限
export const parentPermsList = function (pageNum, pageSize, sysPerms) {
  return req(
    "post",
    "/auth-service/sysPerms/parentPermsList?pageNum=" +
      pageNum +
      "&pageSize=" +
      pageSize,
    sysPerms
  );
};

// 查询所有子权限
export const childrenPermsList = function (parentId) {
  return req("get", "/auth-service/sysPerms/childrenPermsList", {
    parentId: parentId,
  });
};

// 查询所有父节点权限
export const selectParentNode = function (roleId) {
  return req("get", "/auth-service/sysPerms/selectParentNode", {
    roleId: roleId,
  });
};

// 查询所有子节点权限
export const selectChildrenNode = function (parentPath, roleId) {
  return req("get", "/auth-service/sysPerms/selectChildrenNode", {
    parentPath: parentPath,
    roleId: roleId,
  });
};

// 查询树形数据
export const permsTreeList = function (roleId) {
  return req("get", "/auth-service/sysPerms/permsTreeList", { roleId: roleId });
};
