<template>
  <!-- 登录表单 -->
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>登录</span>
      </div>
    </template>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="手机号" prop="tel">
        <el-input placeholder="请输入手机号" v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <el-input
          placeholder="请输入验证码"
          v-model="form.verifyCode"
        ></el-input>
      </el-form-item>

      <el-form-item style="margin-bottom: 10px">
        <img :src="verCode" alt="加载失败" />
        <el-link
          href="javascript:"
          @click="getVerCode"
          :underline="false"
          type="primary"
          >看不清？换一张</el-link
        >
      </el-form-item>
      <el-form-item style="margin-bottom: 10px">
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="gotoSignIn">注册</el-button>
        <el-link href="/findPassword" :underline="false" type="primary"
          >&emsp;忘记密码？找回</el-link
        >
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
        tel: "",
        password: "",
        verifyCode: "",
      },
      verCode: "",
      rules: {
        tel: [
          {
            required: true,
            message: "请输入手机号！",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码！",
            trigger: "change",
          },
        ],
        verifyCode: [
          {
            required: true,
            message: "请输入验证码！",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.getVerCode();
  },
  methods: {
    onSubmit() {
      const _this = this;
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        login(this.form).then(function (resp) {
          //console.log(resp);
          if (resp.token != null) {
            ElMessage.success({
              message: "登陆成功",
              type: "success",
            });
            VueCookies.set("token", resp.token, "1D");
            VueCookies.set("loginUserId", resp.data.userId, "1D");
            //_this.$store.commit("setLoginUserId", resp.data.userId);
            _this.$router.push("/index");
          } else {
            ElMessage.error(resp.data);
          }
        });
      });
    },
    gotoSignIn() {
      const _this = this;
      _this.$router.replace("/signIn");
    },
    getVerCode() {
      const _this = this;
      axios
        .get("http://localhost/auth-service/verifyCode", {
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
