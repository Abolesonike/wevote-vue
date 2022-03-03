<template>
  <!-- 登录表单 -->
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>登录</span>
      </div>
    </template>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
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
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="gotoSignIn">注册</el-button>
        <el-button @click="getVerCode">测试</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入方法
import { login } from "@/api/auth/auth";
import { ElMessage } from "element-plus";
import VueCookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        code: "",
      },
      verCode: "",
    };
  },
  mounted() {
    this.getVerCode();
  },
  methods: {
    onSubmit() {
      const _this = this;
      login(this.form).then(function (resp) {
        console.log(resp);
        if (resp.token != null) {
          ElMessage.success({
            message: "登陆成功",
            type: "success",
          });
          VueCookies.set("token", resp.token, "1D");
          VueCookies.set("loginUserId", resp.data.userId, "1D");
          //_this.$store.commit("setLoginUserId", resp.data.userId);
          _this.$router.push("/");
        } else if (resp.data === "用户不存在！") {
          ElMessage.error("用户不存在！");
        } else if (resp.data === "密码错误！") {
          ElMessage.error("密码错误！");
        } else {
          ElMessage.error("验证码错误！");
        }
      });
    },
    gotoSignIn() {
      const _this = this;
      _this.$router.replace("/signIn");
    },
    getVerCode() {
      const _this = this;
      axios
        .get("http://localhost/user-service/vercode", {
          //和headers   params timeout等属性同级
          responseType: "arraybuffer",
        })
        .then((response) => {
          //console.log(response);
          return (
            "data:image/PNG;base64," +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then((data) => {
          //console.log(data);
          _this.verCode = data;
        });
    },
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
