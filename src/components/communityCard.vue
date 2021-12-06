<template>
  <div style="text-align: center; margin-bottom: 20px">
    <el-image
      src="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      style="width: 100%"
      fit="contain"
    ></el-image>
    <div><h4 style="margin: 0; color: #9d2933">生活区</h4></div>
    <p style="margin: 0; font-size: small">
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
    <el-button type="primary" v-show="this.type === 1" style="width: 100%"
      >加入社区</el-button
    >
    <el-button type="primary" v-show="false" style="width: 100%"
      >进入社区</el-button
    >
    <el-button type="primary" v-show="this.type === 2" style="width: 100%"
      >管理社区</el-button
    >
  </div>
</template>

<script>
export default {
  name: "communityCard",
  props: {
    msg: Number,
  },
  data() {
    return {
      type: this.msg,
    };
  },
};
</script>

<style scoped></style>
