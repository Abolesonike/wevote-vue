<template>
  <el-container>
    <el-header height="100px" style="background: #606266">
      <el-row>
        <el-col :span="4"
          ><div>
            <img
              src="../../assets/logo/logo.png"
              alt="加载失败"
              style="width: 100%"
            /></div
        ></el-col>
        <el-col :span="12"
          ><div><h3>欢迎来到We Vote管理系统</h3></div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>帖子管理</span>
            </template>
            <router-link to="/back/postTable/1">
              <el-menu-item index="1-1"> 审核通过 </el-menu-item>
            </router-link>
            <router-link to="/back/postTable/0">
              <el-menu-item index="1-2"> 待审核 </el-menu-item>
            </router-link>
            <router-link to="/back/postTable/2">
              <el-menu-item index="1-3"> 审核未通过 </el-menu-item>
            </router-link>
            <router-link to="/back/postTable/3">
              <el-menu-item index="1-4"> 回收站 </el-menu-item>
            </router-link>
            <router-link to="/back/postTable/4">
              <el-menu-item index="1-5"> 举报处理 </el-menu-item>
            </router-link>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><IconMenu /></el-icon>
              <span>用户管理</span>
            </template>
            <router-link to="/back/userTable/1">
              <el-menu-item index="2-1"> 用户管理 </el-menu-item>
            </router-link>
            <router-link to="/back/userTable/0">
              <el-menu-item index="2-2"> 禁用用户 </el-menu-item>
            </router-link>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>权限管理</span>
            </template>
            <router-link to="/back/permsTable">
              <el-menu-item index="3-1"> 系统权限 </el-menu-item>
            </router-link>
            <router-link to="/back/roleTable">
              <el-menu-item index="3-2"> 角色管理 </el-menu-item>
            </router-link>
          </el-sub-menu>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>评论管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";
export default {
  name: "index",
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #545c64;
}

.router-link-active {
  text-decoration: none;
}
</style>
