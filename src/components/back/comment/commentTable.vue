<template>
  <h2 v-if="status == 2">审核通过列表</h2>
  <h2 v-if="status == 1">待审核列表</h2>
  <h2 v-if="status == 3">审核未通过列表</h2>
  <h2 v-if="status == 4">已删除列表</h2>
  <h2 v-if="status == 5">举报处理</h2>
  <el-form :inline="true" :model="comment" class="demo-form-inline">
    <el-form-item label="发送者" size="small">
      <el-input placeholder="发送者" v-model="comment.fromUserName"></el-input>
    </el-form-item>
    <el-form-item label="内容" size="small">
      <el-input placeholder="内容" v-model="comment.content"></el-input>
    </el-form-item>
    <el-form-item label="发布时间" size="small">
      <el-date-picker
        v-model="comment.createTimeStart"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      到
      <el-date-picker
        v-model="comment.createTimeEnd"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item size="small">
      <el-button type="primary" icon="el-icon-search" @click="search()"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh-left" @click="restForm()"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="fromUserName" label="发送者" width="200" />
    <el-table-column prop="content" label="内容" width="800" />
    <el-table-column prop="createTime" label="发布时间" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          type="warning"
          v-if="status == 2 || status == 3"
          @click="changeStatus(scope.row.id, 1, '')"
          plain
          size="small"
          >重新审核</el-button
        >
        <el-button
          type="danger"
          v-if="status == 3"
          @click="tempDeletePost(scope.row.id)"
          plain
          size="small"
          >删除</el-button
        >
        <el-button
          type="success"
          v-if="status == 1"
          @click="changeStatus(scope.row.id, 2, '')"
          plain
          size="small"
          >通过</el-button
        >
        <el-button
          type="warning"
          v-if="status == 1"
          @click="disagreePost(scope.row.id)"
          plain
          size="small"
          >不通过</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <br />
  <el-pagination
    background
    :total="pageInfo.total"
    @current-change="handleCurrentChange"
    layout="total, sizes, prev, pager, next, jumper"
    v-model:page-size="pageInfo.pageSize"
    @size-change="handleSizeChange"
    :page-sizes="[5, 10, 20, 50, 100]"
  >
  </el-pagination>
  <!-- 删除理由 -->
  <el-dialog v-model="deleteReasonVisible" title="删除理由" width="40%">
    <el-form :model="reason">
      <el-form-item>
        <el-input
          :autosize="{ minRows: 6, maxRows: 10 }"
          type="textarea"
          placeholder="请输入删除理由。。。"
          v-model="reason.reason"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteReasonVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="changeStatus(deletePostIdTemp, 4, reason.reason)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 不通过理由 -->
  <el-dialog v-model="disagreeReasonVisible" title="不通过理由" width="40%">
    <el-form :model="reason">
      <el-form-item>
        <el-input
          :autosize="{ minRows: 6, maxRows: 10 }"
          type="textarea"
          placeholder="请输入不通过理由。。。"
          v-model="reason.reason"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="disagreeReasonVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="changeStatus(deletePostIdTemp, 3, reason.reason)"
          >确认</el-button
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
import { deletePost } from "@/api/post/post";
import dayjs from "dayjs";
import { ElNotification } from "element-plus";
import { selectComment } from "@/api/comment/comment";

const { changeCommentStatus } = require("@/api/comment/comment");

export default {
  name: "commentTable",
  components: {},
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },

      tableData: [],
      comment: {
        content: "",
        fromUserName: "",
        createTimeStart: "",
        createTimeEnd: "",
        status: 0,
      },
      dialogVisible: false,
      deleteDialogVisible: false,
      deleteReasonVisible: false,
      disagreeReasonVisible: false,
      reason: {
        reason: "",
      },
      deletePostIdTemp: -1,
      rowData: {},
      status: 0,
    };
  },
  methods: {
    loadData() {
      // 加载帖子列表
      const _this = this;
      selectComment(
        this.pageInfo.pageNum,
        this.pageInfo.pageSize,
        this.comment
      ).then(function (resp) {
        //console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.tableData = resp.list;
        _this.pageInfo.total = resp.total;
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      _this.pageInfo.pageNum = currentPageNum;
      _this.loadData();
    },
    handleSizeChange(currentPageSize) {
      // 改变页大小
      const _this = this;
      _this.pageInfo.pageSize = currentPageSize;
      _this.loadData();
    },
    changeStatus(id, status, reason) {
      // 改变帖子状态
      console.log(id, status, reason);
      const _this = this;
      const dic = {
        1: "重新审核",
        2: "审核通过",
        3: "审核未通过",
        4: "已删除",
      };
      changeCommentStatus(id, status, reason).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "一条评论" + dic[status],
            type: "success",
            position: "bottom-right",
          });
          _this.loadData(_this.status);
          _this.reason.reason = "";
          _this.disagreeReasonVisible = false;
          _this.deleteReasonVisible = false;
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
    tempDeletePost(id) {
      // 取得要暂时删除帖子的id，暂时存储
      const _this = this;
      _this.deleteReasonVisible = true;
      _this.deletePostIdTemp = id;
    },
    disagreePost(id) {
      // 取得不通过帖子的id，暂时存储
      const _this = this;
      _this.disagreeReasonVisible = true;
      _this.deletePostIdTemp = id;
    },
    search() {
      const _this = this;
      _this.pageInfo.pageNum = 1;
      _this.loadData();
    },
    restForm() {
      const _this = this;
      _this.comment.fromUserName = "";
      _this.comment.content = "";
      _this.comment.createTimeStart = "";
      _this.comment.createTimeEnd = "";
    },
  },
  mounted() {
    const _this = this;
    _this.status = this.$route.params.status;
    _this.comment.status = this.$route.params.status;
    this.loadData(_this.status);
  },
  watch: {
    $route() {
      const _this = this;
      this.loading = true;
      _this.status = this.$route.params.status;
      _this.comment.status = this.$route.params.status;
      if (_this.status != null) {
        this.loadData(_this.status);
      }
    },
  },
};
</script>

<style scoped></style>
