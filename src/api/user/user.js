import req from "../axios";

// 分页查询所有
export const userListEnable = function (pageNum, pageSize, enable) {
  return req("get", "/auth-service/sysUser/userList", {
    pageNum: pageNum,
    pageSize: pageSize,
    enable: enable,
  });
};

// 根据id查找一个用户
export const findUserById = function (id) {
  return req("get", "/auth-service/sysUser/findById", {
    id: id,
  });
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
