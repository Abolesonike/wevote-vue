<template>
  <div :style="conTop">
    <div style="margin-top: 200px">
      <el-row>
        <el-col :xs="1" :sm="4" :md="6" :lg="6" :xl="9"></el-col>
        <el-col :xs="22" :sm="16" :md="12" :lg="12" :xl="6">
          <div
            style="filter: alpha(Opacity=80); -moz-opacity: 0.5; opacity: 0.7"
          >
            <LoginForm></LoginForm></div
        ></el-col>
        <el-col :xs="1" :sm="4" :md="6" :lg="6" :xl="9"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/login/LoginForm";

export default {
  name: "login",
  components: { LoginForm },
  data() {
    return {
      conTop: {
        backgroundImage:
          "url(" +
          require("../../assets/imgs/javier-allegue-barros-C7B-ExXpOIE-unsplash.jpg") +
          ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100%" /**宽高100%是为了图片铺满屏幕 */,
        position: "absolute",
      },
    };
  },
};
</script>

<style scoped></style>
