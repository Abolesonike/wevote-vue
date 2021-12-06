<template>
  <el-form label-position="top" v-model="userInfo">
    <el-form-item label="用户名(不可编辑)">
      <el-input disabled v-model="userInfo.userName"></el-input>
    </el-form-item>
    <el-form-item label="邮箱(不可编辑)">
      <el-input disabled v-model="userInfo.email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="userInfo.telephone"></el-input>
    </el-form-item>
    <el-form-item label="签名">
      <el-input v-model="userInfo.motto"></el-input>
    </el-form-item>
    <el-form-item label="个人头像">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="userInfo.headersUrl"
        list-type="picture"
      >
        <el-button size="small" type="primary">上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button class="infoSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "myInfo",
  data() {
    return {
      userInfo: {
        userName: "Fizzy Elf",
        email: "123456789@qq.com",
        telephone: "12345678",
        motto: "motto",
        headersUrl: [
          {
            name: "head",
            usl: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
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
