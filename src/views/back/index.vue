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
            <router-link to="/back/postTable/2">
              <el-menu-item index="1-1"> 审核通过 </el-menu-item>
            </router-link>
            <router-link to="/back/postTable/1">
              <el-menu-item index="1-2"> 待审核 </el-menu-item>
            </router-link>
            <router-link to="/back/postTable/3">
              <el-menu-item index="1-3"> 审核未通过 </el-menu-item>
            </router-link>
            <router-link to="/back/postTable/4">
              <el-menu-item index="1-4"> 回收站 </el-menu-item>
            </router-link>
            <router-link to="/back/postTable/5">
              <el-menu-item index="1-5"> 举报处理 </el-menu-item>
            </router-link>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>社区管理</span>
            </template>
            <router-link to="/back/communityTable/2">
              <el-menu-item index="5-1"> 审核通过 </el-menu-item>
            </router-link>
            <router-link to="/back/communityTable/1">
              <el-menu-item index="5-2"> 社区审核 </el-menu-item>
            </router-link>
            <router-link to="/back/communityTable/3">
              <el-menu-item index="5-3"> 审核未通过 </el-menu-item>
            </router-link>
            <router-link to="/back/communityTable/4">
              <el-menu-item index="5-4"> 隐藏社区 </el-menu-item>
            </router-link>
            <router-link to="/back/classification">
              <el-menu-item index="5-5"> 分类管理 </el-menu-item>
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
            <router-link to="/back/userTable/2">
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
          <el-sub-menu index="4">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>评论管理</span>
            </template>
            <router-link to="/back/commentTable/2">
              <el-menu-item index="4-1"> 审核通过 </el-menu-item>
            </router-link>
            <router-link to="/back/commentTable/1">
              <el-menu-item index="4-2"> 评论审核 </el-menu-item>
            </router-link>
            <router-link to="/back/commentTable/3">
              <el-menu-item index="4-3"> 审核不通过 </el-menu-item>
            </router-link>
            <router-link to="/back/commentTable/4">
              <el-menu-item index="4-4"> 举报处理 </el-menu-item>
            </router-link>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main> <router-view></router-view></el-main>
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
  methods: {},
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
