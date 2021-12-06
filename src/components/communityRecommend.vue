<template>
  <el-card class="hostPostCard" shadow="hover">
    <p style="color: white">社区推荐</p>
    <div v-for="count in 4" v-bind:key="count" style="width: 100%">
      <community-card :msg="1"></community-card>
    </div>
  </el-card>
</template>
<script>
import communityCard from "@/components/communityCard";
export default {
  name: "communityRecommend",
  components: { communityCard },
};
</script>

<style scoped>
.hostPostCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
.el-card__body {
  padding: 0;
}
</style>
