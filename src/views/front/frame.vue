<template>
  <el-container>
    <el-header style="background-color: #50616d; height: 100%">
      <Header></Header>
    </el-header>
    <el-main style="background-color: #424c50; overflow-x: hidden">
      <el-row style="background-color: #424c50">
        <el-col class="hidden-md-and-down" :xl="2"></el-col>
        <el-col class="hidden-sm-and-down" :md="6" :lg="4" :xl="4"
          ><aside-menu></aside-menu
        ></el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="16" :xl="16">
          <router-view></router-view>
        </el-col>
      </el-row>
      <el-affix
        position="bottom"
        :offset="100"
        style="position: absolute; right: 40px"
      >
        <el-button type="primary" @click="createPost"
          ><i class="icon-bi iconfont"></i
        ></el-button>
      </el-affix>
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
import Footer from "@/components/Footer";
import VueCookies from "vue-cookies";

const { managerCommId } = require("@/api/user/user");

export default {
  components: { Header, AsideMenu, Footer },
  name: "frame",
  data() {
    return {
      managerCommId: 0,
      userId: 0,
    };
  },
  methods: {
    createPost() {
      this.$router.push("/postCreate");
    },
  },
  mounted() {
    this.userId = VueCookies.get("loginUserId");
  },
  watch: {
    $route() {
      const _this = this;
      this.loading = true;
      const path = this.$route.path;
      if (path.indexOf("communityManage") !== -1) {
        _this.managerCommId = this.$route.params.name.split("&")[0];
        managerCommId(_this.managerCommId, _this.userId, 1);
      } else {
        managerCommId(_this.managerCommId, _this.userId, 2);
      }
    },
  },
};
</script>

<style scoped></style>
