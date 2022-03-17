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

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="10">
          <card
            v-for="postData in postDataList"
            v-bind:key="postData"
            :postData="postData"
          >
          </card>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pageInfo.total"
            :page-size="pageInfo.pageSize"
            @current-change="handleCurrentChange"
            style="margin-bottom: 10px"
          >
          </el-pagination>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="8" :xl="6"
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
import { removeImg, removeVote } from "@/tools/removeImg";
import dayjs from "dayjs";
import { esSearch } from "@/api/es/es";
export default {
  name: "searchView",
  components: { Header, AsideMenu, Card, HotPost, communityRecommend, Footer },
  data() {
    return {
      postDataList: [], // 帖子数据
      pageInfo: {
        pageNum: 1, // 当前页
        pageSize: 5, // 页大小
        total: 0,
      },
      // 排序，0：时间；1：热度
      order: 0,
      post: {
        status: 2,
        community: 0,
      },
      keyword: "",
    };
  },
  methods: {
    loadData() {
      // 加载帖子列表
      const _this = this;
      esSearch(
        _this.$route.params.keyword,
        this.pageInfo.pageNum - 1,
        this.pageInfo.pageSize
      ).then(function (resp) {
        //console.log(resp.recordList);
        for (let i = 0; i < resp.recordList.length; i++) {
          // 格式化日期
          resp.recordList[i].createTime = dayjs(
            resp.recordList[i].create_time
          ).format("YYYY-MM-DD HH:mm:ss");
          // 去掉内容中的图片
          const data = removeImg(resp.recordList[i].content);
          resp.recordList[i].content = data["content"];
          resp.recordList[i].imgList = data["imgs"];
          // 去掉投票
          resp.recordList[i].content = removeVote(resp.recordList[i].content);
          // console.log(resp.list[i].content)
        }
        _this.postDataList = resp.recordList;
        _this.pageInfo.total = resp.recordCount;
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      _this.pageInfo.pageNum = currentPageNum;
      console.log(currentPageNum);
      _this.loadData();
    },
  },
  mounted() {
    this.keyword = this.$route.params.keyword;
    this.pageInfo.pageNum = 1;
    this.loadData();
  },
  watch: {
    $route() {
      //监听相同路由下参数变化的时候，从而实现异步刷新
      this.loading = true;
      //重新获取数据
      this.loadData();
    },
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
