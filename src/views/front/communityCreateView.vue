<template>
  <el-row style="background-color: #424c50">
    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="20">
      <position-card :msg="positionData"></position-card>
      <community-create-card></community-create-card>
    </el-col>
    <el-col class="hidden-md-and-down" :xl="4"></el-col>
  </el-row>
</template>

<script>
import positionCard from "@/components/positionCard";
import communityCreateCard from "@/components/communityCreateCard";

export default {
  name: "communityCreateView",
  components: { positionCard, communityCreateCard },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "创建社区", path: "" },
      ],
    };
  },
};
</script>

<style scoped>
.el-header {
  --el-header-padding: 0 0;
  height: 90px;
}
.el-main {
  padding: 0;
}
</style>
