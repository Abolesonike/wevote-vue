<template>
  <!-- 注册表单 -->
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span
          ><el-link :underline="false" href="/login">登录</el-link
          ><el-link disabled>&nbsp;>&nbsp;注册</el-link></span
        >
      </div>
    </template>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="90px"
    >
      <el-form-item label="用&nbsp;&nbsp;户&nbsp;&nbsp;名" prop="username">
        <el-input placeholder="用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密&emsp;&emsp;码" prop="password">
        <el-input
          placeholder="密码"
          v-model="form.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input
          placeholder="确认密码"
          v-model="form.rePassword"
          type="password"
        ></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phoneNumber">
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
      <el-form-item label="验证码" prop="verifyCode">
        <el-input placeholder="验证码" v-model="form.verifyCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="signIn" type="primary">注册</el-button>
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
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名！",
            trigger: "change",
          },
          {
            min: 3,
            message: "用户名太短！",
            trigger: "change",
          },
          {
            max: 20,
            message: "用户名太长！",
            trigger: "change",
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: "请输入手机号！",
            trigger: "change",
          },
          {
            pattern: /(^((\+86)|(86))?(1[3-9])\d{9}$)/,
            message: "手机号格式错误！",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码！",
            trigger: "change",
          },
          {
            pattern: /(^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$)/,
            message: "密码必须大于8位，且包含字母！",
            trigger: "change",
          },
        ],
        rePassword: [
          {
            required: true,
            message: "请确认密码！",
            trigger: "change",
          },
          {
            validator: this.validateRePassword,
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
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
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
      });
    },
    getVerCode() {
      const _this = this;
      if (_this.form.phoneNumber === "") {
        ElMessage.error("请输入手机号！");
        return;
      }
      const reg = new RegExp(/(^((\+86)|(86))?(1[3-9])\d{9}$)/);
      if (reg.test(_this.form.phoneNumber)) {
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
      } else {
        ElMessage.error("手机号格式错误！");
      }
    },
    validateRePassword(rule, value, callback) {
      const _this = this;
      // 验证支付方式
      if (!value || value !== _this.form.password) {
        // 自定义验证条件，返回错误提示文字
        callback(new Error("密码不一致！"));
      } else {
        callback();
      }
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
