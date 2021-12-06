<template>
  <el-menu
    active-text-color="#7397AB"
    background-color="#424C50"
    class="el-menu-vertical-demo"
    :default-active="decodeURI(this.$route.path)"
    text-color="#FFFFFF"
    router
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
      <el-menu-item index="/myCommunity/生活区">生活区</el-menu-item>
      <el-menu-item index="/myCommunity/电影区">电影区</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <i class="icon-jifen iconfont" style="font-size: large"></i>
        <span> 我创建的社区</span>
      </template>
      <el-menu-item index="/createCommunity">创建社区</el-menu-item>
      <el-menu-item index="/myCreatedCommunity">我创建社区</el-menu-item>
      <el-menu-item index="/communityManage/生活区">生活区</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="5">
      <i class="icon-tuandui iconfont" style="font-size: large"></i>
      <span> 活动中心</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AsideMenu",
};
</script>

<style scoped>
.el-menu {
  border-right: solid 0 px var(--el-menu-border-color);
}
</style>
