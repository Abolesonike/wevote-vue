<template>
  <el-form
    :model="userData"
    label-position="left"
    label-width="100px"
    class="demo-form-inline"
  >
    <el-form-item label="id">
      <el-input
        v-model="userData.userId"
        disabled
        placeholder="id"
      ></el-input> </el-form-item
    ><el-form-item label="用户名">
      <el-input
        v-model="userData.username"
        disabled
        placeholder="用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="userData.password" placeholder="无密码"></el-input>
    </el-form-item>
    <el-form-item label="头像">
      <el-input v-model="userData.headUrl" placeholder="无头像" clearable />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="userData.email" placeholder="无邮箱" clearable />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="userData.tel" placeholder="无电话" clearable />
    </el-form-item>
    <el-form-item label="身份证号码">
      <el-input
        v-model="userData.idcard"
        placeholder="无身份证号码"
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "userDetail",
  data() {
    return {
      userData: this.rowData,
    };
  },
  props: {
    rowData: Object,
  },
};
</script>

<style scoped></style>
