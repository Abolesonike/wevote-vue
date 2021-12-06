<template>
  <el-card class="communityInfoCard">
    <el-image
      src="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      style="width: 100%"
      fit="contain"
    ></el-image>
    <div><h4 style="margin: 0; color: #9d2933">生活区</h4></div>
    <p style="margin: 0; font-size: small">
      <i class="icon-yonghu iconfont"></i>社长:管理员
      <i class="icon-taolun iconfont"></i>帖子:1000
      <i class="icon-tuandui iconfont"></i>成员:200
    </p>
    <div style="height: 100px">
      <p style="margin: 0; font-size: small">
        阿里妈妈MUX倾力打造的矢量图标管理、交流平台。 设计师将图标上传到
        iconfont
        平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。
      </p>
    </div>
    <el-button type="primary" @click="createPost">交流发帖</el-button>
  </el-card>
</template>

<script>
export default {
  name: "communityInfoCard",
  methods: {
    createPost() {
      this.$router.push("/postCreate");
    },
  },
};
</script>

<style scoped>
.communityInfoCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
}
</style>
