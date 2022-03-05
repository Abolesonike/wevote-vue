<template>
  <h2 v-show="enable == 1">用户列表</h2>
  <h2 v-show="enable == 2">禁用列表</h2>
  <el-form :inline="true" :model="sysUser" class="demo-form-inline">
    <el-form-item label="用户名" size="small">
      <el-input placeholder="用户名" v-model="sysUser.username"></el-input>
    </el-form-item>
    <el-form-item label="角色" size="small">
      <el-select placeholder="角色" clearable v-model="sysUser.roleName">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.roleName"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="注册时间" size="small">
      <el-date-picker
        v-model="sysUser.createTimeStart"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      到
      <el-date-picker
        v-model="sysUser.createTimeEnd"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item size="small">
      <el-button type="primary" icon="el-icon-search" @click="search()"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh-left" @click="sysUser = {}"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="headUrl" label="头像" width="180" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="tel" label="电话" />
    <el-table-column label="角色" width="150">
      <template v-slot="scope">
        <el-select
          v-model="scope.row.roleName"
          class="m-2"
          placeholder="Select"
          size="small"
          @change="changeRole(scope.row)"
        >
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button type="primary" @click="showDetail(scope.row)" plain
          >修改</el-button
        >
        <el-button
          type="warning"
          v-show="enable == 1"
          @click="changeEnable(scope.row.userId, '2')"
          plain
          >禁用</el-button
        >
        <el-button
          type="success"
          v-show="enable == 2"
          @click="changeEnable(scope.row.userId, '1')"
          plain
          >启用</el-button
        >
        <el-button type="danger" @click="getDeleteId(scope.row.userId)" plain
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    :total="totalDataNumber"
    @current-change="handleCurrentChange"
    layout="total, sizes, prev, pager, next, jumper"
    v-model:page-size="pageInfo.pageSize"
    @size-change="handleSizeChange"
    :page-sizes="[5, 10, 20, 50, 100]"
  >
  </el-pagination>
  <!-- 用户详情弹框 -->
  <el-dialog v-model="detailVisible" title="详情" width="50%" destroy-on-close>
    <userDetail :rowData="rowData"></userDetail>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirm" type="primary">确定修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 彻底删除确认弹框 -->
  <el-dialog v-model="deleteDialogVisible" title="警告" width="30%" center>
    <span>彻底删除后数据无法恢复，请谨慎操作！！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteById(deleteUserIdTemp)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  changeEnable,
  update,
  deleteById,
  changeRole,
  selectUser,
} from "@/api/user/user";
import userDetail from "@/components/back/sysUser/userDetail";
import dayjs from "dayjs";
import { ElNotification } from "element-plus";
import { findAllByEnableStatus } from "@/api/role/role";

export default {
  name: "userTable",
  components: { userDetail },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      totalDataNumber: 0,
      sysUser: {
        username: "",
        enableStatus: 0,
        createTimeStart: "",
        createTimeEnd: "",
        roleName: "",
      },
      tableData: [],
      detailVisible: false,
      deleteDialogVisible: false,
      deleteUserIdTemp: -1,
      rowData: {},
      enable: 0,
      // 启用角色列表
      roleList: [],
    };
  },
  methods: {
    loadData() {
      // 加载帖子列表
      const _this = this;
      selectUser(
        this.pageInfo.pageNum,
        this.pageInfo.pageSize,
        this.sysUser
      ).then(function (resp) {
        //console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          resp.list[i].modifyTime = dayjs(resp.list[i].modifyTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.tableData = resp.list;
        _this.totalDataNumber = resp.total;
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      selectUser(currentPageNum, this.pageInfo.pageSize, this.sysUser).then(
        function (resp) {
          // console.log(resp);
          for (let i = 0; i < resp.list.length; i++) {
            // 格式化日期
            resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            resp.list[i].modifyTime = dayjs(resp.list[i].modifyTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          _this.tableData = resp.list;
        }
      );
    },
    handleSizeChange(currentPageSize) {
      // 改变页大小
      const _this = this;
      _this.pageInfo.pageSize = currentPageSize;
      selectUser(1, this.pageInfo.pageSize, this.sysUser).then(function (resp) {
        // console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.tableData = resp.list;
      });
    },
    showDetail(row) {
      // 点击修改
      const _this = this;
      _this.rowData = row; // 传递数据
      _this.detailVisible = true; // 显示弹框
      // console.log(row);
    },
    confirm() {
      // 修改，点击确定
      const _this = this;
      // 将格式化的日期改回原来的格式
      _this.rowData.createTime = dayjs(_this.rowData.createTime).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      _this.rowData.modifyTime = dayjs(_this.rowData.modifyTime).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      update(_this.rowData).then(function (resp) {
        // console.log(resp);
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "用户信息被成功被修改",
            type: "success",
            position: "bottom-right",
          });
          _this.detailVisible = false; // 关闭弹框
          _this.loadData();
        }
      });
    },
    cancel() {
      // 修改，点击取消
      const _this = this;
      _this.detailVisible = false; // 关闭弹框
      _this.enable = this.$route.params.enable;
      this.loadData();
    },
    changeEnable(id, enable) {
      const _this = this;
      const dic = {
        2: "禁用",
        1: "启用",
      };
      changeEnable(id, enable).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "用户被成功" + dic[enable],
            type: "success",
            position: "bottom-right",
          });
          _this.loadData();
        }
      });
    },
    getDeleteId(id) {
      const _this = this;
      _this.deleteUserIdTemp = id;
      _this.deleteDialogVisible = true;
    },
    deleteById(id) {
      // 物理删除
      const _this = this;
      deleteById(id).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "用户被成功删除",
            type: "success",
            position: "bottom-right",
          });
          _this.loadData(_this.enable);
          _this.deleteDialogVisible = false;
        }
      });
    },
    changeRole(row) {
      const _this = this;
      const userId = row.userId;
      const roleId = row.roleName;
      changeRole(userId, roleId).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "角色分配成功",
            type: "success",
            position: "bottom-right",
          });
          _this.loadData();
        } else {
          ElNotification({
            title: "操作失败",
            message: "角色分配失败",
            type: "error",
            position: "bottom-right",
          });
          _this.loadData();
        }
      });
    },
    search() {
      const _this = this;
      _this.loadData();
    },
  },
  mounted() {
    const _this = this;
    _this.enable = this.$route.params.enable;
    _this.sysUser.enableStatus = this.$route.params.enable;
    this.loadData();
    // 查询角色列表
    findAllByEnableStatus(1).then(function (resp) {
      _this.roleList = resp;
    });
  },
  watch: {
    $route() {
      const _this = this;
      this.loading = true;
      _this.enable = this.$route.params.enable;
      _this.sysUser.enableStatus = this.$route.params.enable;
      if (_this.enable != null) {
        this.loadData();
      }
    },
  },
};
</script>

<style scoped></style>
