<template>
  <el-row :gutter="10">
    <el-col :xs="6" :sm="4" :md="4" :lg="6" :xl="6"></el-col>
    <el-col class="hidden-xs-only" :sm="6" :md="6" :lg="4" :xl="4"
      ><el-image
        :src="require('@/assets/logo/logo.png')"
        style="width: 200px; height: 100px"
        fit="contain"
      ></el-image
    ></el-col>
    <el-col :xs="12" :sm="10" :md="12" :lg="9" :xl="12"
      ><p>
        <span>关于我们</span><el-divider direction="vertical"></el-divider
        ><span>联系我们</span>
        <el-divider direction="vertical"></el-divider>意见反馈
      </p></el-col
    >
  </el-row>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped></style>
