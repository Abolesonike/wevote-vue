<template>
  <el-menu
    active-text-color="#7397AB"
    background-color="#424C50"
    class="el-menu-vertical-demo"
    :default-active="decodeURI(this.$route.path)"
    text-color="#FFFFFF"
    router
    style="height: 751px"
  >
    <el-menu-item index="/">
      <i class="icon-dingwei iconfont" style="font-size: large"></i>
      <span> 首页</span>
    </el-menu-item>
    <el-menu-item index="/community">
      <i class="icon-liaotian iconfont" style="font-size: large"></i>
      <span> 社区</span>
    </el-menu-item>
    <el-sub-menu index="/myCommunity">
      <template #title>
        <i class="icon-shuqianshoucang iconfont" style="font-size: large"></i>
        <span> 我加入的社区</span>
      </template>
      <el-menu-item
        v-for="community in joinedCommunity"
        v-bind:key="community.id"
        :index="`/myCommunity/${community.id}&${community.name}`"
        >{{ community.name }}</el-menu-item
      >
      <!--      <el-menu-item index="/myCommunity/电影区">电影区</el-menu-item>-->
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <i class="icon-jifen iconfont" style="font-size: large"></i>
        <span> 我创建的社区</span>
      </template>
      <el-menu-item index="/createCommunity">创建社区</el-menu-item>
      <el-menu-item index="/myCreatedCommunity">社区管理</el-menu-item>
      <!--      <el-menu-item index="/communityManage/生活区">生活区</el-menu-item>-->
    </el-sub-menu>
    <el-menu-item index="5">
      <i class="icon-tuandui iconfont" style="font-size: large"></i>
      <span> 活动中心</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { selectUserJoinedComm } from "@/api/community/community";
import { getLoginUserId } from "@/api/user/user";

export default {
  name: "AsideMenu",
  data() {
    return {
      // 加入的社区
      joinedCommunity: [],
      // 创建的社区
      createdCommunity: [],
    };
  },
  methods: {
    getJoinedCommunity(userId) {
      const _this = this;
      selectUserJoinedComm(userId).then(function (resp) {
        _this.joinedCommunity = resp;
        //console.log(resp);
      });
    },
  },
  mounted() {
    const _this = this;
    getLoginUserId().then(function (resp) {
      _this.getJoinedCommunity(resp);
    });
  },
};
</script>

<style scoped>
.el-menu {
  border-right: solid 0 px var(--el-menu-border-color);
}
</style>
