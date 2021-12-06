<template>
  <el-container>
    <el-header style="background-color: #50616d">
      <Header></Header>
    </el-header>
    <el-main
      style="background-color: #424c50; overflow-x: hidden; height: 100%"
    >
      <el-row style="background-color: #424c50">
        <el-col class="hidden-md-and-down" :xl="2"></el-col>
        <el-col :xs="0" :sm="0" :md="6" :lg="4" :xl="4"
          ><aside-menu style="margin: 10px"></aside-menu
        ></el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="14">
          <position-card :msg="positionData"></position-card>
          <community-manage-card></community-manage-card>
        </el-col>

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
import positionCard from "@/components/positionCard";
import communityManageCard from "@/components/communityManageCard";
import Footer from "@/components/Footer";
export default {
  name: "communityManageView",
  components: { Header, AsideMenu, positionCard, communityManageCard, Footer },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "我创建的社区", path: "/myCreatedCommunity" },
        { name: decodeURI(this.$route.path.split("/")[2]), path: "" },
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
