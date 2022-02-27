<template>
  <h2>权限列表</h2>
  <el-table
    :data="roleTableData"
    stripe
    style="width: 100%; margin-bottom: 10px"
  >
    <el-table-column prop="roleId" label="角色编号" width="180">
    </el-table-column>
    <el-table-column prop="roleName" label="角色名称" width="180">
    </el-table-column>
    <el-table-column prop="roleDesc" label="描述"> </el-table-column>
    <el-table-column label="启用状态">
      <template v-slot="scope">
        <el-switch
          v-model="scope.row.enableStatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
          @change="changeEnableStatus(scope.row)"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="创建时间"> </el-table-column>
    <el-table-column prop="modifyTime" label="修改时间"> </el-table-column>
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button type="primary" plain @click="openRoleTree(scope.row.roleId)"
          >权限分配</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="showAddRoleForm(null)">添加角色</el-button>
  <el-dialog
    title="权限分配"
    v-model="roleDialogVisible"
    width="30%"
    destroy-on-close
  >
    <el-tree
      :props="permsTree"
      :data="permsTreeData"
      :default-checked-keys="checkedPerms"
      node-key="permsId"
      show-checkbox
      @check-change="handlePermsCheckChange"
      ref="tree"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitPermsCheckChange()"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog
    title="添加角色"
    v-model="roleAddDialogVisible"
    width="20%"
    destroy-on-close
  >
    <el-form label-position="top" :model="addRoleFrom">
      <el-form-item label="角色名称">
        <el-input v-model="addRoleFrom.roleName"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="addRoleFrom.roleDesc"></el-input>
      </el-form-item>
      <el-form-item label="权限分配">
        <el-tree
          :props="permsTree"
          :data="permsTreeData"
          :default-checked-keys="checkedPerms"
          node-key="permsId"
          show-checkbox
          @check-change="handlePermsCheckChange"
          ref="tree"
        >
        </el-tree>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="roleAddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  add,
  assignPermissions,
  checkIsAssigned,
  roleList,
  update,
} from "@/api/role/role";

import dayjs from "dayjs";
import { permsTreeList } from "@/api/perms/perms";
import { ElNotification } from "element-plus";

export default {
  name: "roleTable",
  data() {
    return {
      // 角色数据
      roleTableData: [],
      // 权限分配弹窗是否可见标志
      roleDialogVisible: false,
      // 添加角色弹窗是否可见标志
      roleAddDialogVisible: false,
      // 页面树形控件数据
      permsTree: {
        // 树形控件的label对应数据的path
        label: "path",
        children: "children",
      },
      // 当前角色选中的权限
      checkedPerms: [],
      // 树形权限数据结构
      permsTreeData: [],
      // 当前编辑角色的id
      modifyRoleId: 0,
      // 添加角色
      addRoleFrom: {
        roleName: "",
        roleDesc: "",
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        currentPageNum: 1,
      },
    };
  },
  methods: {
    loadData() {
      // 进入页面时，加载角色表数据
      const _this = this;
      roleList(this.pageInfo.pageNum, this.pageInfo.pageSize).then(function (
        resp
      ) {
        // console.log(resp.list);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createDate = dayjs(resp.list[i].createDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          resp.list[i].modifyTime = dayjs(resp.list[i].modifyTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.roleTableData = resp.list;
        _this.pages = resp.pages * 10;
      });
    },
    changeEnableStatus(row) {
      // 改变是否启用时，触发的函数
      const _this = this;
      checkIsAssigned(row.roleId).then(function (resp) {
        // console.log(resp);
        if (resp === false) {
          ElNotification({
            title: "操作失败",
            message: "角色已经被分配给用户，不能停用！",
            type: "error",
            position: "bottom-right",
          });
          _this.loadData();
        } else {
          // console.log(row);
          let message = "";
          if (row.enableStatus === "0") {
            message = "禁用";
          } else {
            message = "启用";
          }
          // 将格式化的日期改回原来的格式
          row.createDate = dayjs(row.createDate).format("YYYY-MM-DDTHH:mm:ss");
          row.modifyTime = dayjs(row.modifyTime).format("YYYY-MM-DDTHH:mm:ss");
          update(row).then(function (resp) {
            if (resp === true) {
              _this.loadData();
              ElNotification({
                title: "操作成功",
                message: message + "成功!",
                type: "success",
                position: "bottom-right",
              });
            } else {
              ElNotification({
                title: "操作失败",
                message: "状态变更失败",
                type: "error",
                position: "bottom-right",
              });
            }
          });
        }
      });
    },
    openRoleTree(roleId) {
      // 打开分配权限时调用的函数
      const _this = this;
      _this.permsTreeData = [];
      _this.checkedPerms = [];
      _this.modifyRoleId = roleId;
      permsTreeList(roleId).then(function (resp) {
        // console.log(resp);
        _this.permsTreeData = resp.parentList;
        _this.checkedPerms = resp.permsIds;
        _this.roleDialogVisible = true;
      });
    },
    handlePermsCheckChange(data, checked) {
      // 改变权限时调用的函数
      //console.log(data, checked);
      const _this = this;
      if (checked === false && data.children.length === 0) {
        _this.checkedPerms.splice(_this.checkedPerms.indexOf(data.permsId), 1);
      } else if (checked === true && data.children.length === 0) {
        _this.checkedPerms.push(data.permsId);
      }
      console.log(_this.checkedPerms);
    },
    commitPermsCheckChange() {
      // 分配权限，点击确定
      const _this = this;
      _this.roleDialogVisible = false;
      // console.log(_this.modifyRoleId);
      // console.log(_this.checkedPerms);
      assignPermissions(_this.checkedPerms, _this.modifyRoleId).then(function (
        resp
      ) {
        if (resp.code === 200) {
          ElNotification({
            title: "操作成功",
            message: resp.message,
            type: "success",
            position: "bottom-right",
          });
        } else {
          ElNotification({
            title: "操作失败",
            message: resp.message,
            type: "error",
            position: "bottom-right",
          });
        }
      });
      _this.permsTreeData = [];
      _this.checkedPerms = [];
      _this.modifyRoleId = 0;
    },
    showAddRoleForm() {
      const _this = this;
      permsTreeList(0).then(function (resp) {
        // console.log(resp);
        _this.permsTreeData = resp.parentList;
        _this.checkedPerms = resp.permsIds;
        _this.roleAddDialogVisible = true;
      });
    },
    addRole() {
      const _this = this;
      _this.roleAddDialogVisible = false;
      add(_this.checkedPerms, _this.addRoleFrom).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: resp.message,
            type: "success",
            position: "bottom-right",
          });
          _this.loadData();
        } else {
          ElNotification({
            title: "操作失败",
            message: resp.message,
            type: "error",
            position: "bottom-right",
          });
        }
      });
      _this.permsTreeData = [];
      _this.checkedPerms = [];
      _this.modifyRoleId = 0;
      _this.addRoleFrom.roleName = "";
      _this.addRoleFrom.roleDesc = "";
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped></style>
