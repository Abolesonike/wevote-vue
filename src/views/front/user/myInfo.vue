<template>
  <el-form ref="form" label-position="top" :model="userInfo" :rules="rules">
    <el-form-item label="用户名" prop="username">
      <el-row :gutter="20">
        <el-col :span="21">
          <el-input v-model="userInfo.username"></el-input
        ></el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            :disabled="originUsername === userInfo.username"
            @click="changeUsername()"
            >保存</el-button
          ></el-col
        >
      </el-row>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-row :gutter="20">
        <el-col :span="21">
          <el-input v-model="userInfo.email"></el-input
        ></el-col>
        <el-col :span="3">
          <el-button
            :disabled="originEmail === userInfo.email"
            type="primary"
            @click="changeEmail()"
            >保存</el-button
          ></el-col
        >
      </el-row>
    </el-form-item>
    <el-form-item label="电话(不可编辑)">
      <el-input disabled v-model="userInfo.tel"></el-input>
    </el-form-item>
    <el-form-item label="个人头像">
      <el-image style="width: 100px;" :src="userInfo.headUrl"></el-image>
      <el-upload
        action=""
        :show-file-list="false"
        :auto-upload="false"
        :on-change="changeHead"
      >
        <el-button type="primary">修改</el-button>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script>
import VueCookies from "vue-cookies";
import {
  selectUser,
  update,
  updateEmail,
  updateUsername,
} from "@/api/user/user";
import { ElMessage } from "element-plus";
const { uploadImg } = require("@/api/fileUpload/fileUpload");
export default {
  name: "myInfo",
  data() {
    return {
      userInfo: {
        userId: 0,
        username: "",
        email: "",
        tel: 0,
        headersUrl: "",
      },
      originUsername: "",
      originEmail: "",
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
        email: [
          {
            pattern:
              /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            message: "邮箱格式错误！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    loadData() {
      const _this = this;
      _this.userInfo.userId = VueCookies.get("loginUserId");
      // console.log(_this.userInfo);
      selectUser(1, 1, _this.userInfo).then(function (resp) {
        _this.userInfo = resp.list[0];
        _this.originUsername = resp.list[0].username;
        _this.originEmail = resp.list[0].email;
      });
    },
    changeUsername() {
      const _this = this;
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        updateUsername(_this.userInfo).then(function (resp) {
          if (resp.code === 200) {
            _this.loadData();
            ElMessage.success("保存成功");
          } else {
            ElMessage.error("保存失败：" + resp.message);
          }
        });
      });
    },
    changeEmail() {
      const _this = this;
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        updateEmail(_this.userInfo).then(function (resp) {
          if (resp.code === 200) {
            _this.loadData();
            ElMessage.success("保存成功");
          } else {
            ElMessage.error("保存失败：" + resp.message);
          }
        });
      });
    },
    changeHead(file) {
      // console.log(file);
      const _this = this;
      //上传文件校验
      this.otherFiles = file.raw;
      // FormData 对象
      const formData = new FormData();
      // 文件对象
      formData.append("file", this.otherFiles);
      uploadImg(formData).then((res) => {
        if (res.success === true) {
          _this.userInfo.headUrl = res.downloadUrl;
          update(_this.userInfo);
          _this.loadData();
          ElMessage.success("修改成功");
        } else {
          ElMessage.error("图片上传失败:" + res.errorMsg);
        }
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.infoSave {
  width: 100%;
  margin: 10px 0;
  background: #424c50 !important;
  color: #ffff !important;
  --el-border-base: 0px;
}
</style>
