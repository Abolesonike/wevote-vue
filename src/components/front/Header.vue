<template>
  <el-row :gutter="10" style="height: 200px">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div style="width: 100%">
        <img
          src="../../assets/logo/logo.png"
          style="width: 100%"
          alt="加载失败"
        /></div
    ></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="grid-content bg-purple-light"></div
    ></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="grid-content bg-purple"></div
    ></el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div class="grid-content bg-purple-light"></div
    ></el-col>
  </el-row>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
