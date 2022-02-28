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
          <!--          <card></card>-->
          <el-pagination
            :pager-count="5"
            background
            layout="prev, pager, next"
            :total="1000"
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
// import Card from "@/components/Card";
import communityNoticeCard from "@/components/communityNoticeCard";
import communityInfoCard from "@/components/communityInfoCard";
import Footer from "@/components/Footer";
export default {
  name: "myCommunityView",
  components: {
    Header,
    AsideMenu,
    // Card,
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
        { name: decodeURI(this.$route.path.split("/")[2]), path: "" },
      ],
    };
  },
  methods: {
    createPost() {
      this.$router.push("/postCreate");
    },
  },
  watch: {
    $route() {
      this.loading = true;
      this.$router.go(0);
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
