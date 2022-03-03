<template>
  <h2 v-if="status == 2">审核通过列表</h2>
  <h2 v-if="status == 1">待审核列表</h2>
  <h2 v-if="status == 3">审核未通过列表</h2>
  <h2 v-if="status == 4">已删除列表</h2>
  <h2 v-if="status == 5">举报处理</h2>
  <el-form :inline="true" :model="post" class="demo-form-inline">
    <el-form-item label="标题" size="small">
      <el-input placeholder="标题" v-model="post.title"></el-input>
    </el-form-item>
    <el-form-item label="发送者" size="small">
      <el-input placeholder="发送者" v-model="post.postUserName"></el-input>
    </el-form-item>
    <el-form-item label="社区" size="small">
      <el-select placeholder="社区" clearable v-model="post.community">
        <el-option
          v-for="item in communityList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
        <el-pagination
          layout="prev, pager, next"
          :total="commPages"
          @current-change="handleCommCurrentChange"
          :pager-count="5"
        >
        </el-pagination>
      </el-select>
    </el-form-item>
    <el-form-item label="发布时间" size="small">
      <el-date-picker
        v-model="post.createTimeStart"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      到
      <el-date-picker
        v-model="post.createTimeEnd"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item size="small">
      <el-button type="primary" icon="el-icon-search" @click="search()"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh-left" @click="post = {}">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="标题" width="400" />
    <el-table-column prop="postUserName" label="发送者" width="200" />
    <el-table-column prop="createTime" label="发布时间" />
    <el-table-column prop="community" label="社区" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          type="primary"
          @click="showDetail(scope.row)"
          plain
          size="small"
          >详情</el-button
        >
        <el-button
          type="success"
          v-if="status == 1"
          @click="changeStatus(scope.row.id, 2)"
          plain
          size="small"
          >通过</el-button
        >
        <el-button
          type="warning"
          v-if="status == 1"
          @click="changeStatus(scope.row.id, 3)"
          plain
          size="small"
          >不通过</el-button
        >
        <el-button
          type="success"
          v-if="status == 2 || status == 3"
          @click="changeStatus(scope.row.id, 1)"
          plain
          size="small"
          >重新审核</el-button
        >
        <el-button
          type="danger"
          v-if="status != 4"
          @click="changeStatus(scope.row.id, 4)"
          plain
          size="small"
          >删除</el-button
        >
        <el-button
          type="success"
          v-if="status == 4"
          @click="changeStatus(scope.row.id, 1)"
          plain
          size="small"
          >恢复</el-button
        >
        <el-button
          type="danger"
          v-if="status == 4"
          @click="getDeletePostId(scope.row.id)"
          plain
          size="small"
          >彻底删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <br />
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
import { changeStatus, deletePost, selectPostVo } from "@/api/post/post";
import dayjs from "dayjs";
import postDetail from "@/components/back/post/postDetail";
import { ElNotification } from "element-plus";
import { select } from "@/api/community/community";

export default {
  name: "postTable",
  components: { postDetail },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      communityPageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      tableData: [],
      totalDataNumber: 0,
      post: {
        title: "",
        community: "",
        postUserName: "",
        createTimeStart: "",
        createTimeEnd: "",
        status: 0,
      },
      // 社区
      community: {
        // 社区状态
        status: 2,
        // 社区分类
        classification: 0,
      },
      // 查询到的社区列表
      communityList: [],
      // 总页数
      commPages: 10,
      dialogVisible: false,
      deleteDialogVisible: false,
      deletePostIdTemp: -1,
      rowData: {},
      status: 0,
    };
  },
  methods: {
    loadData() {
      // 加载帖子列表
      const _this = this;
      selectPostVo(
        this.pageInfo.pageNum,
        this.pageInfo.pageSize,
        this.post
      ).then(function (resp) {
        console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
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
      selectPostVo(currentPageNum, this.pageInfo.pageSize, this.post).then(
        function (resp) {
          // console.log(resp);
          for (let i = 0; i < resp.list.length; i++) {
            // 格式化日期
            resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
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
      selectPostVo(1, this.pageInfo.pageSize, this.post).then(function (resp) {
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
    handleCommCurrentChange(currentPageNum) {
      // 社区翻页
      const _this = this;
      select(
        currentPageNum,
        this.communityPageInfo.pageSize,
        this.community
      ).then(function (resp) {
        _this.communityList = resp.list;
        _this.commPages = resp.pages * 10;
      });
    },
    showDetail(row) {
      // 帖子详情
      const _this = this;
      _this.rowData = row; // 传递数据
      _this.dialogVisible = true; // 显示弹框
      // console.log(row);
    },
    changeStatus(id, status) {
      // 改变帖子状态
      const _this = this;
      const dic = {
        1: "重新审核",
        2: "审核通过",
        3: "审核未通过",
        4: "已删除",
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
    search() {
      const _this = this;
      _this.pageInfo.pageNum = 1;
      _this.loadData();
    },
  },
  mounted() {
    const _this = this;
    _this.status = this.$route.params.status;
    _this.post.status = this.$route.params.status;
    this.loadData(_this.status);
    select(
      _this.communityPageInfo.pageNum,
      _this.communityPageInfo.pageSize,
      _this.community
    ).then(function (resp) {
      _this.communityList = resp.list;
      _this.commPages = resp.pages * 10;
    });
  },
  watch: {
    $route() {
      const _this = this;
      this.loading = true;
      _this.status = this.$route.params.status;
      _this.post.status = this.$route.params.status;
      if (_this.status != null) {
        this.loadData(_this.status);
      }
    },
  },
};
</script>

<style scoped></style>
