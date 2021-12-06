<template>
  <el-container>
    <el-header style="background-color: #50616d">
      <Header></Header>
    </el-header>
    <el-main style="background-color: #424c50; overflow-x: hidden">
      <el-row>
        <el-col class="hidden-md-and-down" :xl="2"></el-col>
        <el-col :xs="0" :sm="0" :md="6" :lg="4" :xl="4"
          ><aside-menu style="margin: 10px"></aside-menu
        ></el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="10">
          <position-card :msg="positionData"></position-card>
          <post-detail></post-detail>
        </el-col>
        <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="6"
          ><div><HotPost></HotPost></div
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
import postDetail from "@/components/postDetail";
import Header from "@/components/Header";
import positionCard from "@/components/positionCard";
import AsideMenu from "@/components/AsideMenu";
import HotPost from "@/components/front/HotPost";
import Footer from "@/components/Footer";

export default {
  name: "postDetailView",
  components: { Header, AsideMenu, postDetail, HotPost, positionCard, Footer },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "生活区", path: "/myCommunity/生活区" },
        { name: "详情", path: "" },
      ],
    };
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
