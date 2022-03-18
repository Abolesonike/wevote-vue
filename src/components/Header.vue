<template>
  <el-row :gutter="5" style="background: #50616d">
    <el-col class="hidden-xs-only" :sm="2" :md="1" :lg="1" :xl="2"></el-col>
    <el-col :xs="7" :sm="6" :md="0" :lg="0" :xl="0">
      <h1 style="text-align: center; color: white" @click="drawer = true">
        ...
      </h1>
    </el-col>
    <el-col :xs="10" :sm="6" :md="6" :lg="3" :xl="4" style="position: relative">
      <img src="../assets/logo/logo.png" alt="加载失败" />
    </el-col>
    <el-col class="hidden-xs-only" :sm="4" :md="4" :lg="7" :xl="6">
      <!--      <el-menu-->
      <!--        default-active="1"-->
      <!--        class="el-menu-demo"-->
      <!--        mode="horizontal"-->
      <!--        background-color="#50616D"-->
      <!--        text-color="#fff"-->
      <!--        active-text-color="#7397AB"-->
      <!--        style="margin: 15px"-->
      <!--      >-->
      <!--        <el-menu-item index="/">首页</el-menu-item>-->
      <!--        &lt;!&ndash;        <el-menu-item index="2">探索</el-menu-item>&ndash;&gt;-->
      <!--        <el-menu-item index="/community"> 社区</el-menu-item>-->
      <!--      </el-menu>-->
    </el-col>
    <el-col class="hidden-sm-and-down" :md="9" :lg="7" :xl="5"
      ><el-form
        style="margin-top: 20px"
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        :rules="rules"
        ref="searchForm"
      >
        <el-form-item prop="keyword">
          <el-input
            v-model="searchForm.keyword"
            placeholder="关键词"
            size="medium"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-search"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form></el-col
    >
    <el-col :xs="6" :sm="6" :md="2" :lg="1" :xl="1">
      <el-dropdown style="margin: 15px">
        <el-avatar :size="55" :src="circleUrl"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="gotoHome()">个人主页</el-dropdown-item>
            <el-dropdown-item
              v-if="
                sysUser.roleName === '超级管理员' ||
                sysUser.roleName === '系统管理员'
              "
              @click="gotoBack()"
              >后台管理</el-dropdown-item
            >
            <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
    <el-col :md="3" :lg="3" :xl="2" class="hidden-md-and-down"
      ><div style="margin: 15px">
        <div
          style="
            font-size: 14px;
            color: whitesmoke;
            margin-top: 20px;
            width: 100%;
          "
        >
          <p>{{ sysUser.tel }}</p>
          <p>{{ sysUser.username }}</p>
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
import VueCookies from "vue-cookies";
import { selectUser } from "@/api/user/user";

const { logout } = require("@/api/auth/auth");
export default {
  name: "test",
  components: { AsideMenu },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      drawer: false,
      sysUser: {
        userId: 0,
      },
      searchForm: {
        keyword: "",
      },
      rules: {
        keyword: [
          {
            required: true,
            message: "请输入关键字！",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    search() {
      const _this = this;
      this.$refs["searchForm"].validate((valid) => {
        if (valid) {
          _this.$router.push("/search/" + _this.searchForm.keyword);
        }
      });
    },
    gotoHome() {
      const _this = this;
      _this.$router.push("/userHome");
    },
    gotoBack() {
      const _this = this;
      _this.$router.push("/back/postTable/2");
    },
    logout() {
      const _this = this;
      logout().then(function (resp) {
        if (resp.code === 200) {
          VueCookies.remove("token");
          VueCookies.remove("loginUserId");
          _this.$router.push("/login");
        }
      });
    },
  },
  mounted() {
    const _this = this;
    _this.sysUser.userId = VueCookies.get("loginUserId");
    selectUser(1, 1, _this.sysUser).then(function (resp) {
      _this.sysUser = resp.list[0];
      //console.log(_this.sysUser);
    });
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
