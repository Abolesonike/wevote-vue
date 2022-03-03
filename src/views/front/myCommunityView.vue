<template>
  <el-container>
    <el-header style="background-color: #50616d">
      <Header></Header>
    </el-header>
    <el-main style="background-color: #424c50; overflow-x: hidden">
      <el-row style="background-color: #424c50">
        <el-col class="hidden-md-and-down" :xl="2"></el-col>
        <el-col :xs="0" :sm="0" :md="6" :lg="4" :xl="4"
          ><aside-menu style="margin: 10px"></aside-menu
        ></el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="10">
          <position-card :msg="positionData"></position-card>
          <el-card class="postFilter"
            ><div>
              <span style="font-size: small; color: whitesmoke">最新</span>
              <el-divider direction="vertical"></el-divider>
              <span style="font-size: small; color: whitesmoke">热门</span>
              <el-divider direction="vertical"></el-divider>
              <span style="font-size: small; color: whitesmoke">精华</span>
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
        <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="5">
          <communityInfoCard></communityInfoCard
          ><community-notice-card></community-notice-card
        ></el-col>
        <el-col class="hidden-md-and-down" :xl="5"></el-col>
      </el-row>
    </el-main>
    <el-footer style="background-color: #50616d; height: 100px">
      <Footer></Footer>
    </el-footer>
  </el-container>
  <el-backtop>
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        text-align: center;
        line-height: 35px;
        padding: 0 12px 0 12px;
      "
    >
      Top
    </div>
  </el-backtop>
  <el-affix
    position="bottom"
    :offset="100"
    style="position: absolute; right: 32px"
  >
    <el-button type="primary" @click="createPost"
      ><i class="icon-bi iconfont"></i
    ></el-button>
  </el-affix>
</template>

<script>
import Header from "@/components/Header";
import AsideMenu from "@/components/AsideMenu";
import positionCard from "@/components/positionCard";
import Card from "@/components/Card";
import communityNoticeCard from "@/components/communityNoticeCard";
import communityInfoCard from "@/components/communityInfoCard";
import Footer from "@/components/Footer";
import { selectPostVo } from "@/api/post/post";
import dayjs from "dayjs";
import { removeImg, removeVote } from "@/tools/removeImg";
export default {
  name: "myCommunityView",
  components: {
    Header,
    AsideMenu,
    Card,
    communityNoticeCard,
    communityInfoCard,
    Footer,
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
      selectPostVo(currentPageNum, this.pageInfo.pageSize, _this.post).then(
        function (resp) {
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
        }
      );
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
