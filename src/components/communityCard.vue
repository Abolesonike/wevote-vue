<template>
  <div style="margin-bottom: 20px">
    <el-image
      src="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      style="width: 100%"
      fit="contain"
    ></el-image>
    <div style="text-align: center">
      <h4 style="margin: 0; color: #9d2933">{{ data.name }}</h4>
    </div>
    <p style="text-align: center; margin: 0; font-size: small">
      <i class="icon-taolun iconfont"></i>帖子:1000
      <i class="icon-tuandui iconfont"></i>成员:200
    </p>
    <div style="height: 100px">
      <p style="margin: 0; font-size: small">
        {{ data.introduction }}
      </p>
    </div>
    <el-button type="primary" v-show="this.c_type === 1" style="width: 100%"
      >进入社区</el-button
    >
    <el-button type="primary" v-show="this.c_type === 2" style="width: 100%"
      >加入社区</el-button
    >
    <el-button @click="gotoCommManage" type="primary" v-show="this.c_type === 3" style="width: 100%"
      >管理社区</el-button
    >
  </div>
</template>

<script>
export default {
  name: "communityCard",
  props: {
    type: Number,
    communityData: {},
  },
  data() {
    return {
      c_type: this.type,
      data: this.communityData,
    };
  },
  methods: {
    gotoCommManage() {
      this.$router.push("/communityManage/生活区");
    }
  }
};
</script>

<style scoped></style>
