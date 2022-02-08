<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="8"
        ><div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="8">
          <signInForm></signInForm
          ></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="8"
        ><div class="grid-content bg-purple"></div
        ></el-col> </el-row
      ></el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import signInForm from "@/components/login/SignInForm";
export default {
  name: "login",
  components: { signInForm },
};
</script>

<style scoped></style>
