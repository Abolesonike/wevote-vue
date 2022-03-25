import req from "../axios";

// 分页查询所有
export const selectUser = function (pageNum, pageSize, sysUser) {
  return req(
    "post",
    "/auth-service/sysUser/select?pageNum=" + pageNum + "&pageSize=" + pageSize,
    sysUser
  );
};

// 禁用启用一个用户
export const changeEnable = function (id, enable) {
  return req("put", "/auth-service/sysUser/changeEnable", {
    id: id,
    enable: enable,
  });
};

// 修改一个用户
export const update = function (sysUser) {
  return req("put", "/auth-service/sysUser/updateById", sysUser);
};

// 修改一个用户
export const updateUsername = function (sysUser) {
  return req("put", "/auth-service/sysUser/updateUsername", sysUser);
};

// 修改一个用户
export const updateEmail = function (sysUser) {
  return req("put", "/auth-service/sysUser/updateEmail", sysUser);
};

// 修改一个用户
export const changeRole = function (userId, roleId) {
  return req("put", "/auth-service/sysUser/changeRole", {
    userId: userId,
    roleId: roleId,
  });
};

// 删除一个用户
export const deleteById = function (id) {
  return req("delete", "/auth-service/sysUser/deleteById", {
    id: id,
  });
};

// 获取登录用户id
export const getLoginUserId = function () {
  return req("get", "auth-service/sysUser/loginUserId");
};

export const managerCommId = function (communityId, userId, type) {
  return req("get", "auth-service/sysUser/managerCommId", {
    communityId: communityId,
    userId: userId,
    type: type,
  });
};
