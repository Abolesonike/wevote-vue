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
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="14">
          <position-card :msg="positionData"></position-card>
          <community-create-card></community-create-card>
        </el-col>
        <el-col class="hidden-md-and-down" :xl="4"></el-col>
      </el-row>
    </el-main>
    <el-footer style="background-color: #50616d; height: 150px">
      <Footer></Footer>
    </el-footer>
  </el-container>
  <el-backtop />
</template>

<script>
import Header from "@/components/Header";
import AsideMenu from "@/components/AsideMenu";
import positionCard from "@/components/positionCard";
import communityCreateCard from "@/components/communityCreateCard";
import Footer from "@/components/Footer";
export default {
  name: "communityCreateView",
  components: { Header, AsideMenu, positionCard, communityCreateCard, Footer },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "创建社区", path: "" },
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
