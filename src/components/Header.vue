<template>
  <el-row style="background: #50616d">
    <el-col class="hidden-xs-only" :sm="2" :md="1" :lg="1" :xl="2"></el-col>
    <el-col :xs="7" :sm="7" :md="0" :lg="0" :xl="0">
      <h1 style="text-align: center; color: white" @click="drawer = true">
        ...
      </h1>
    </el-col>
    <el-col :xs="10" :sm="6" :md="6" :lg="3" :xl="4" style="position: relative">
      <img src="../assets/logo/logo.png" alt="加载失败" />
    </el-col>
    <el-col class="hidden-xs-only" :sm="6" :md="6" :lg="5" :xl="6"
      ><el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#50616D"
        text-color="#fff"
        active-text-color="#7397AB"
        style="margin: 15px"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">探索</el-menu-item>
        <el-menu-item index="3">我的社区</el-menu-item>
      </el-menu></el-col
    >
    <el-col class="hidden-xs-only" :sm="6" :md="9" :lg="7" :xl="5"
      ><el-form :inline="true" class="demo-form-inline" style="margin: 15px">
        <el-form-item>
          <el-input placeholder="关键词" size="medium">
            <template #prefix>
              <i class="el-input__icon el-icon-search"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info">搜索</el-button>
        </el-form-item>
      </el-form></el-col
    >
    <el-col :xs="6" :sm="6" :md="2" :lg="1" :xl="1"
      ><div style="margin: 15px">
        <router-link to="/userHome">
          <el-avatar :size="50" :src="circleUrl"></el-avatar
        ></router-link></div
    ></el-col>
    <el-col :md="3" :lg="3" :xl="2" class="hidden-md-and-down"
      ><div style="margin: 15px">
        <div
          style="
            font-size: 10px;
            color: whitesmoke;
            margin-top: 20px;
            width: 100%;
          "
        >
          <p>2442168421@qq.com</p>
          <p>FizzyElf</p>
        </div>
      </div></el-col
    >
  </el-row>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    title="I am the title"
    :with-header="false"
    size="300px"
  >
    <aside-menu></aside-menu>
  </el-drawer>
</template>

<script>
import "element-plus/theme-chalk/display.css";
import AsideMenu from "@/components/AsideMenu";
export default {
  name: "test",
  components: { AsideMenu },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      drawer: false,
    };
  },
};
</script>

<style scoped>
.el-menu--horizontal {
  border-bottom: solid 0 var(--el-menu-border-color);
}
img {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
</style>

<style>
.el-drawer {
  --el-drawer-background-color: #424c50 !important;
  --el-drawer-padding-primary: 0 !important;
}
</style>
