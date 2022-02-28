<template>
  <el-container>
    <el-header style="background-color: #50616d">
      <Header></Header>
    </el-header>
    <el-main style="background-color: #424c50; overflow-x: hidden">
      <el-row style="background-color: #424c50">
        <el-col class="hidden-md-and-down" :xl="2"></el-col>
        <el-col class="hidden-sm-and-down" :md="6" :lg="4" :xl="4"
          ><aside-menu style="margin: 10px"></aside-menu
        ></el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="10">
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
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="6"
          ><div>
            <HotPost></HotPost><community-recommend></community-recommend></div
        ></el-col>
        <el-col class="hidden-md-and-down" :xl="5"></el-col>
      </el-row>
    </el-main>
    <el-footer style="background-color: #50616d; height: 100px">
      <Footer></Footer>
    </el-footer>
  </el-container>
  <el-backtop />
</template>

<script>
import Header from "@/components/Header";
import AsideMenu from "@/components/AsideMenu";
import Card from "@/components/Card";
import HotPost from "@/components/front/HotPost";
import communityRecommend from "@/components/communityRecommend";
import Footer from "@/components/Footer";
import { postListStatus } from "@/api/post/post";
import { removeImg, removeVote } from "@/tools/removeImg";
import dayjs from "dayjs";
export default {
  name: "index",
  components: { Header, AsideMenu, Card, HotPost, communityRecommend, Footer },
  data() {
    return {
      postDataList: [], // 帖子数据
      pageInfo: {
        pageNum: 1, // 当前页
        pageSize: 5, // 页大小
        pages: 10,
      },
      postStatus: 1, // 帖子状态，1表示审核通过
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
      postListStatus(
        currentPageNum,
        this.pageInfo.pageSize,
        this.postStatus
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
        }
        _this.postDataList = resp.list;
        _this.pageInfo.pages = resp.pages * 10;
      });
    },
  },
  mounted() {
    const _this = this;
    this.loadData(_this.postStatus);
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
</style>
