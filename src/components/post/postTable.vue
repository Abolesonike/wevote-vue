<template>
  <h2 v-if="status == 1">审核通过列表</h2>
  <h2 v-if="status == 0">待审核列表</h2>
  <h2 v-if="status == 2">审核未通过通过列表</h2>
  <h2 v-if="status == 3">已删除列表</h2>
  <h2 v-if="status == 4">举报处理</h2>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="postUserId" label="发送者id" width="180" />
    <el-table-column prop="postTime" label="发布时间" />
    <el-table-column prop="status" label="状态" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button type="primary" @click="showDetail(scope.row)" plain
          >详情</el-button
        >
        <el-button
          type="success"
          v-if="status == 0"
          @click="changeStatus(scope.row.id, 1)"
          plain
          >通过</el-button
        >
        <el-button
          type="warning"
          v-if="status == 0"
          @click="changeStatus(scope.row.id, 2)"
          plain
          >不通过</el-button
        >
        <el-button
          type="success"
          v-if="status == 1 || status == 2"
          @click="changeStatus(scope.row.id, 0)"
          plain
          >重新审核</el-button
        >
        <el-button
          type="danger"
          v-if="status != 3"
          @click="changeStatus(scope.row.id, 3)"
          plain
          >删除</el-button
        >
        <el-button
          type="success"
          v-if="status == 3"
          @click="changeStatus(scope.row.id, 0)"
          plain
          >恢复</el-button
        >
        <el-button
          type="danger"
          v-if="status == 3"
          @click="getDeletePostId(scope.row.id)"
          plain
          >彻底删除</el-button
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
  <!-- 帖子详情弹框 -->
  <el-dialog v-model="dialogVisible" title="详情" width="50%" destroy-on-close>
    <post-detail :rowData="rowData"></post-detail>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 彻底删除确认弹框 -->
  <el-dialog v-model="deleteDialogVisible" title="警告" width="30%" center>
    <span>彻底删除后数据无法恢复，请谨慎操作！！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deletePost(deletePostIdTemp)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { postListStatus, changeStatus, deletePost } from "@/api/post/post";
import dayjs from "dayjs";
import postDetail from "@/components/post/postDetail";
import { ElNotification } from "element-plus";

export default {
  name: "postTable",
  components: { postDetail },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      tableData: [],
      pages: 10,
      dialogVisible: false,
      deleteDialogVisible: false,
      deletePostIdTemp: -1,
      rowData: {},
      status: 0,
    };
  },
  methods: {
    loadData(status) {
      // 加载帖子列表
      const _this = this;
      postListStatus(
        this.pageInfo.pageNum,
        this.pageInfo.pageSize,
        status
      ).then(function (resp) {
        //console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].postTime = dayjs(resp.list[i].postTime).format(
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
      postListStatus(currentPageNum, this.pageInfo.pageSize, this.status).then(
        function (resp) {
          // console.log(resp);
          for (let i = 0; i < resp.list.length; i++) {
            // 格式化日期
            resp.list[i].postTime = dayjs(resp.list[i].postTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          _this.tableData = resp.list;
          _this.pages = resp.pages * 10;
        }
      );
    },
    showDetail(row) {
      // 帖子详情
      const _this = this;
      _this.rowData = row; // 传递数据
      _this.dialogVisible = true; // 显示弹框
      console.log(row);
    },
    changeStatus(id, status) {
      // 改变帖子状态
      const _this = this;
      const dic = {
        0: "重新审核",
        1: "审核通过",
        2: "审核未通过",
        3: "已删除",
      };
      changeStatus(id, status).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "一条帖子" + dic[status],
            type: "success",
            position: "bottom-right",
          });
          _this.loadData(_this.status);
        }
      });
    },
    deletePost(id) {
      // 彻底删除
      const _this = this;
      deletePost(id).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "一条帖子被彻底删除",
            type: "success",
            position: "bottom-right",
          });
        }
      });
      _this.deleteDialogVisible = false;
      _this.loadData(_this.status);
    },
    getDeletePostId(id) {
      // 取得要彻底删除帖子的id，暂时存储
      const _this = this;
      _this.deleteDialogVisible = true;
      _this.deletePostIdTemp = id;
    },
  },
  mounted() {
    const _this = this;
    _this.status = this.$route.params.status;
    this.loadData(_this.status);
  },
  watch: {
    $route() {
      const _this = this;
      this.loading = true;
      _this.status = this.$route.params.status;
      if (_this.status != null) {
        this.loadData(_this.status);
      }
    },
  },
};
</script>

<style scoped></style>
