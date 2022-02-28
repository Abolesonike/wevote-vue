<template>
  <el-card class="hostPostCard" shadow="hover">
    <p style="color: white">社区推荐</p>
    <div
      v-for="community in communityList"
      v-bind:key="community.id"
      style="width: 100%"
    >
      <community-card :communityData="community" :type="2"></community-card>
    </div>
  </el-card>
</template>
<script>
import communityCard from "@/components/communityCard";

import { select } from "@/api/community/community";
export default {
  name: "communityRecommend",
  components: { communityCard },
  data() {
    return {
      // 社区分类
      commClassification: [],
      // 社区
      community: {
        // 社区状态
        status: 1,
        // 社区分类
        classification: 0,
      },
      // 查询到的社区列表
      communityList: [],
    };
  },
  methods: {
    selectCommunity(tab) {
      const _this = this;
      if (tab !== null || tab !== "undefined") {
        _this.community.classification = tab.props.name;
      } else {
        _this.community.classification = 0;
      }
      select(_this.community).then(function (resp) {
        // console.log(resp);
        _this.communityList = resp;
      });
    },
  },
  mounted() {
    const _this = this;
    select(_this.community).then(function (resp) {
      _this.communityList = resp;
    });
  },
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
