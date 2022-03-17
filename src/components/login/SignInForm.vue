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
        <el-input placeholder="用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input placeholder="确认密码" v-model="form.rePassword"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input
          v-model="form.phoneNumber"
          placeholder="手机号"
          class="input-with-select"
        >
          <template #append>
            <el-button @click="getVerCode">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input placeholder="验证码" v-model="form.verifyCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="signIn">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入方法
import axios from "axios";
import { signIn } from "@/api/auth/auth";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      form: {
        username: "",
        phoneNumber: "",
        password: "",
        rePassword: "",
        verifyCode: "",
      },
      sysUser: {
        username: "",
        tel: "",
        password: "",
      },
      verCode: "",
    };
  },
  methods: {
    onSubmit() {},
    signIn() {
      const _this = this;
      _this.sysUser.username = _this.form.username;
      _this.sysUser.tel = _this.form.phoneNumber;
      _this.sysUser.password = _this.form.password;
      signIn(_this.sysUser, _this.form.verifyCode).then(function (resp) {
        if (resp.code === 200) {
          ElMessage.success({
            message: resp.message,
            type: "success",
          });
          _this.$router.replace("/login");
        } else {
          ElMessage.error(resp.message);
        }
      });
    },
    getVerCode() {
      axios
        .get(
          "http://localhost/auth-service/messageCode?phoneNumber=" +
            this.form.phoneNumber
        )
        .then((response) => {
          //console.log(response);
          console.log(response);
          if (response.data.code === 200) {
            ElMessage.success({
              message: response.data.message,
              type: "success",
            });
          } else {
            ElMessage.error(response.data.message);
          }
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
