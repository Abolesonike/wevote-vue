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
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="14">
          <position-card :msg="positionData"></position-card>
          <el-card class="communityContain"
            ><el-row :gutter="25">
              <el-col
                :xs="24"
                :sm="12"
                :md="12"
                :lg="8"
                :xl="8"
                v-for="community in communityList"
                v-bind:key="community.id"
                ><community-card
                  :communityData="community"
                  :type="3"
                ></community-card
              ></el-col> </el-row
            ><el-pagination
              :pager-count="5"
              background
              layout="prev, pager, next"
              :total="pages"
              style="margin-bottom: 10px"
              @current-change="handleCurrentChange"
            >
            </el-pagination
          ></el-card>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="4"></el-col>
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
import communityCard from "@/components/communityCard";
import Footer from "@/components/Footer";
import { managerCommunity } from "@/api/community/community";
import { getLoginUserId } from "@/api/user/user";
export default {
  name: "myCreatedCommunityView",
  components: { Header, AsideMenu, positionCard, communityCard, Footer },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "我管理的社区", path: "" },
      ],
      community: {
        owner: 0,
      },
      communityList: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 9,
      },
      pages: 10,
    };
  },
  methods: {
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      managerCommunity(
        currentPageNum,
        _this.pageInfo.pageSize,
        _this.community.owner
      ).then(function (resp) {
        _this.communityList = resp.list;
      });
    },
  },
  mounted() {
    const _this = this;
    getLoginUserId().then(function (resp) {
      _this.community.owner = resp;
      managerCommunity(
        _this.pageInfo.pageNum,
        _this.pageInfo.pageSize,
        resp
      ).then(function (resp) {
        _this.communityList = resp.list;
        _this.pages = resp.pages * 10;
      });
    });
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
.communityContain {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
