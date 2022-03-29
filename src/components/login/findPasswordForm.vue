<template>
  <!-- 登录表单 -->
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span
          ><el-link :underline="false" href="/login">登录</el-link
          ><el-link disabled>&nbsp;>&nbsp;忘记密码</el-link></span
        >
      </div>
    </template>
    <el-steps :active="nowStep" finish-status="success">
      <el-step title="确认手机号" />
      <el-step title="重置密码" />
      <el-step title="重置成功" />
    </el-steps>
    <div style="margin-top: 34px" v-if="nowStep === 0">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="tel">
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 34px" v-if="nowStep === 1">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认码" prop="rePassword">
          <el-input
            v-model="form.rePassword"
            placeholder="请输确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <span>{{ form.tel }}</span
          ><el-link
            type="primary"
            :underline="false"
            style="position: absolute; right: 5px"
            @click="nowStep = 0"
            >修改</el-link
          >
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode">
          <el-input
            v-model="form.verifyCode"
            placeholder="请输入短信验证码"
            class="input-with-select"
          >
            <template #append>
              <el-button @click="getVerCode">获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 34px" v-if="nowStep === 2">
      <el-result
        icon="success"
        title="密码找回成功"
        sub-title="点击确认返回登录页面"
      ></el-result>
    </div>
    <el-button
      style="margin-top: 12px; width: 100%"
      type="primary"
      @click="next"
      >确认</el-button
    >
  </el-card>
</template>

<script>
// 引入方法

import axios from "axios";
import { ElMessage } from "element-plus";
import { resetPassword } from "@/api/auth/auth";

export default {
  name: "findPasswordForm",
  data() {
    return {
      nowStep: 0,
      form: {
        tel: "",
        password: "",
        rePassword: "",
        verifyCode: "",
      },
      rules: {
        tel: [
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
            message: "请输入密码！",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    next() {
      const _this = this;
      if (_this.nowStep === 1) {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }
          resetPassword(
            _this.form.tel,
            _this.form.password,
            _this.form.verifyCode
          ).then(function (resp) {
            if (resp.code === 200) {
              if (_this.nowStep++ > 2) _this.nowStep = 0;
            } else {
              ElMessage.error(resp.message);
            }
          });
        });
      } else if (_this.nowStep === 2) {
        _this.$router.push("/login");
      } else {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }
          if (_this.nowStep++ > 2) _this.nowStep = 0;
        });
      }
    },
    getVerCode() {
      axios
        .get(
          "http://localhost:8080/auth-service/messageCode?phoneNumber=" + this.form.tel
        )
        .then((response) => {
          //console.log(response);
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
