<template>
  <h2 v-show="enable == 1">用户列表</h2>
  <h2 v-show="enable == 0">禁用列表</h2>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="headUrl" label="头像" width="180" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="tel" label="电话" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="modifyTime" label="修改时间" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button type="primary" @click="showDetail(scope.row)" plain
          >修改</el-button
        >
        <el-button
          type="warning"
          v-show="enable == 1"
          @click="changeEnable(scope.row.userId, '0')"
          plain
          >禁用</el-button
        >
        <el-button
          type="success"
          v-show="enable == 0"
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
    layout="prev, pager, next"
    :total="pages"
    @current-change="handleCurrentChange"
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
  userListEnable,
  changeEnable,
  update,
  deleteById,
} from "@/api/user/user";
import userDetail from "@/components/sysUser/userDetail";
import dayjs from "dayjs";
import { ElNotification } from "element-plus";

export default {
  name: "userTable",
  components: { userDetail },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      tableData: [],
      pages: 10,
      detailVisible: false,
      deleteDialogVisible: false,
      deleteUserIdTemp: -1,
      rowData: {},
      enable: 0,
    };
  },
  methods: {
    loadData(enable) {
      // 加载帖子列表
      const _this = this;
      userListEnable(
        this.pageInfo.pageNum,
        this.pageInfo.pageSize,
        enable
      ).then(function (resp) {
        console.log(resp);
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
        _this.pages = resp.pages * 10;
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      userListEnable(currentPageNum, this.pageInfo.pageSize, this.enable).then(
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
          _this.pages = resp.pages * 10;
        }
      );
    },
    showDetail(row) {
      // 点击修改
      const _this = this;
      _this.rowData = row; // 传递数据
      _this.detailVisible = true; // 显示弹框
      console.log(row);
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
        console.log(resp);
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "用户信息被成功被修改",
            type: "success",
            position: "bottom-right",
          });
          _this.detailVisible = false; // 关闭弹框
          _this.loadData(_this.enable);
        }
      });
    },
    cancel() {
      // 修改，点击取消
      const _this = this;
      _this.detailVisible = false; // 关闭弹框
      _this.enable = this.$route.params.enable;
      this.loadData(_this.enable);
    },
    changeEnable(id, enable) {
      const _this = this;
      const dic = {
        0: "禁用",
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
          _this.loadData(_this.enable);
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
  },
  mounted() {
    const _this = this;
    _this.enable = this.$route.params.enable;
    this.loadData(_this.enable);
  },
  watch: {
    $route() {
      const _this = this;
      this.loading = true;
      _this.enable = this.$route.params.enable;
      if (_this.enable != null) {
        this.loadData(_this.enable);
      }
    },
  },
};
</script>

<style scoped></style>
