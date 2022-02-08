<template>
  <!-- 注册表单 -->
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>注册</span>
      </div>
    </template>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码密码">
        <el-input v-model="form.rePassword"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>

      <el-form-item>
        <img :src="verCode" alt="加载失败" />
        <el-link
          href="javascript:"
          @click="getVerCode"
          :underline="false"
          type="primary"
          >看不清？换一张</el-link
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="gotoSignIn">注册</el-button>
        <el-button @click="getVerCode">测试</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入方法
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        rePassword: "",
        code: "",
      },
      verCode: "",
    };
  },
  mounted() {
    this.getVerCode();
  },
  methods: {
    onSubmit() {},
    gotoSignIn() {
      const _this = this;
      _this.$router.push("/signIn");
    },
    getVerCode() {},
  },
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
