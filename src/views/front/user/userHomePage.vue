<template>
  <el-row style="background-color: #424c50">
    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
      <el-card class="tabsCard">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="myInfo">
            <my-info></my-info>
          </el-tab-pane>
          <el-tab-pane label="我的消息" name="myMessage"
            ><my-message></my-message
          ></el-tab-pane>
          <el-tab-pane label="我的投票" name="myPost">
            <myPost></myPost>
          </el-tab-pane>
          <el-tab-pane label="我的收藏" name="myCollection">
            <my-collection></my-collection>
          </el-tab-pane>
          <el-tab-pane label="我的点赞" name="myComment"
            ><my-like></my-like
          ></el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <el-col class="hidden-md-and-down" :xl="5"></el-col>
  </el-row>
</template>

<script>
import myInfo from "@/views/front/user/myInfo";
import myMessage from "@/views/front/user/myMessage";
import myPost from "@/views/front/user/myPost";
import myCollection from "@/views/front/user/myCollection";
import myLike from "@/views/front/user/myLike";
export default {
  name: "userHomePage",
  components: {
    myInfo,
    myMessage,
    myPost,
    myCollection,
    myLike,
  },
  data() {
    return {
      activeName: "myInfo",
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleClick(tab, event) {
      // console.log(tab, event);
    },
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
.tabsCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
