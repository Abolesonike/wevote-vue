<template>
  <el-card class="hostPostCard" shadow="hover">
    <p style="color: white">社区公告</p>
    <div v-for="count in 5" v-bind:key="count">
      <p>懂了，中国科学家当初不该与美国合作</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "communityNoticeCard",
};
</script>

<style scoped>
.hostPostCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
