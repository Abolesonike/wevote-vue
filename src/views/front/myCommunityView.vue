<template>
  <el-row style="background-color: #424c50">
    <el-col :xs="24" :sm="24" :md="16" :lg="14" :xl="16">
      <position-card :msg="positionData"></position-card>
      <el-card class="postFilter"
        ><div>
          <el-link
            :underline="false"
            style="font-size: small; color: whitesmoke"
            @click="changeOrder(0)"
            ><span
              v-if="order === 0 && post.type !== 1"
              style="font-weight: bold"
              >最新</span
            >
            <span v-if="order !== 0 || post.type === 1">最新</span></el-link
          >
          <el-divider direction="vertical"></el-divider>
          <el-link
            :underline="false"
            style="font-size: small; color: whitesmoke"
            @click="changeOrder(1)"
            ><span v-if="order === 1" style="font-weight: bold">热门</span>
            <span v-if="order !== 1">热门</span></el-link
          >
          <el-divider direction="vertical"></el-divider>
          <el-link
            :underline="false"
            style="font-size: small; color: whitesmoke"
            @click="postType1()"
            ><span v-if="post.type === 1" style="font-weight: bold">精华</span>
            <span v-if="post.type !== 1">精华</span></el-link
          >
        </div></el-card
      >

      <card
        v-for="postData in postDataList"
        v-bind:key="postData"
        :postData="postData"
      >
      </card>
      <el-pagination
        :pager-count="5"
        background
        layout="prev, pager, next"
        :total="pageInfo.pages"
        @current-change="handleCurrentChange"
        style="margin-bottom: 10px"
      >
      </el-pagination>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="8">
      <communityInfoCard></communityInfoCard
      ><community-notice-card></community-notice-card
    ></el-col>
  </el-row>
</template>

<script>
import positionCard from "@/components/positionCard";
import Card from "@/components/Card";
import communityNoticeCard from "@/components/communityNoticeCard";
import communityInfoCard from "@/components/communityInfoCard";

import { selectPostVo } from "@/api/post/post";
import dayjs from "dayjs";
import { removeImg, removeVote } from "@/tools/removeImg";

export default {
  name: "myCommunityView",
  components: {
    Card,
    communityNoticeCard,
    communityInfoCard,
    positionCard,
  },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "社区", path: "/community" },
        { name: decodeURI(this.$route.path.split("&")[1]), path: "" },
      ],
      post: {
        status: 2,
        community: 0,
      },
      postDataList: [], // 帖子数据
      pageInfo: {
        pageNum: 1, // 当前页
        pageSize: 5, // 页大小
        pages: 10,
      },
      // 排序，0：时间；1：热度
      order: 0,
    };
  },
  methods: {
    createPost() {
      this.$router.push("/postCreate");
    },
    loadData() {
      // 加载帖子列表
      const _this = this;
      selectPostVo(
        this.pageInfo.pageNum,
        this.pageInfo.pageSize,
        this.order,
        _this.post
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
        _this.pageInfo.pages = resp.pages * 10;
        // console.log(_this.postDataList);
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      _this.pageInfo.pageNum = currentPageNum;
      _this.loadData();
    },
    changeOrder(order) {
      const _this = this;
      _this.pageInfo.pageNum = 1;
      _this.order = order;
      _this.post.type = 0;
      _this.loadData();
    },
    postType1() {
      const _this = this;
      _this.pageInfo.pageNum = 1;
      _this.order = 0;
      _this.post.type = 1;
      _this.loadData();
    },
  },
  watch: {
    $route() {
      this.loading = true;
      this.$router.go(0);
    },
  },
  mounted() {
    const _this = this;
    _this.post.community = Number(this.$route.path.split("&")[0].split("/")[2]);
    this.loadData();
  },
};
</script>

<style scoped>
.el-header {
  --el-header-padding: 0 0;
  height: 90px;
}
.el-main {
  padding: 0;
}
.postFilter {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
