<template>
  <div v-for="postData in postDataList" v-bind:key="postData">
    <Card style="background: #424c50" :postData="postData"></Card>
    <div style="margin-left: 10px; margin-bottom: 20px">
            <el-button type="primary" size="small" @click="updatePost(postData.id)">编辑</el-button>
      <el-popconfirm
        title="删除后无法恢复，确认操作吗？"
        @confirm="deletePost(postData.id)"
      >
        <template #reference>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-popconfirm>
      <span>&emsp;状态：</span>
      <span v-if="postData.status === 1">待审核</span>
      <span v-if="postData.status === 2">审核通过</span>
      <span v-if="postData.status === 3">审核未通过</span>
      <span v-if="postData.status === 4">已被管理员删除</span>
    </div>
  </div>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="pageInfo.total"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script>
import Card from "@/components/Card";
import VueCookies from "vue-cookies";
import { deletePost, myPost } from "@/api/post/post";
import dayjs from "dayjs";
import { removeImg, removeVote } from "@/tools/removeImg";
export default {
  name: "myPost",
  components: { Card },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      userId: 0,
      postDataList: [],
    };
  },
  methods: {
    loadData() {
      const _this = this;
      myPost(
        _this.pageInfo.pageNum,
        _this.pageInfo.pageSize,
        _this.userId
      ).then(function (resp) {
        // console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          // 去掉内容中的图片
          const data = removeImg(resp.list[i].content);
          resp.list[i].content = data["content"];
          resp.list[i].imgList = data["imgs"];
          // 去掉投票
          resp.list[i].content = removeVote(resp.list[i].content);
          // console.log(resp.list[i].content)
        }
        _this.postDataList = resp.list;
        _this.pageInfo.total = resp.total;
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      _this.pageInfo.pageNum = currentPageNum;
      _this.loadData();
    },
    deletePost(id) {
      const _this = this;
      deletePost(id).then(function (resp) {
        if (resp === true) {
          _this.loadData();
        }
      });
    },
    updatePost(id) {
      const _this = this;
      _this.$router.push("/postUpdate/" + id);
    },
  },
  mounted() {
    const _this = this;
    _this.userId = VueCookies.get("loginUserId");
    this.loadData();
  },
};
</script>

<style scoped></style>
