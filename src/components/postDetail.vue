<template>
  <el-card class="post-card" shadow="hover">
    <el-row>
      <el-col :xs="6" :sm="3" :md="3" :lg="2" :xl="2"
        ><div>
          <el-avatar
            :size="50"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar></div
      ></el-col>
      <el-col :xs="18" :sm="21" :md="21" :lg="22" :xl="22"
        ><div>
          <span class="post_username">云玩家</span>
          <span>2021/10/26 17:13/</span>
          <span>社区:生活区/</span>
          <span>点赞:2/</span>
          <span>评论:30</span>
        </div>
        <div>
          <h3 class="post_title">{{ postData.title }}</h3>
        </div></el-col
      >
    </el-row>
    <div
      style="color: #d1d9e0"
      v-for="(p, index) in this.postData.content"
      v-bind:key="p"
    >
      <div v-html="p"></div>
      <vote-card
        :vote="this.voteList[index]"
        v-if="this.voteList[index] !== undefined"
      ></vote-card>
    </div>
    <el-row style="margin: 15px 0 15px 0">
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="3">
        <i class="icon-zan iconfont"></i>
        2 赞！
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="3">
        <i class="icon-fenxiang iconfont"></i>
        4 分享
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="3">
        <i class="icon-shoucang iconfont"></i>
        5 收藏
      </el-col>
    </el-row>
    <comment-input style="margin-bottom: 40px"></comment-input>
    <commentCard></commentCard>
  </el-card>
</template>

<script>
import commentInput from "@/components/commentInput";
import commentCard from "@/components/commentCard";
import voteCard from "@/components/voteCard";

import { findById } from "@/api/post/post";
import { findByIds } from "@/api/post/vote";

import { removeVote } from "@/tools/removeImg";

export default {
  name: "postDetail",
  components: { commentInput, commentCard, voteCard },
  data() {
    return {
      postData: {},
      voteList: [],
    };
  },
  methods: {
    getPostData() {
      const _this = this;
      findById(this.$route.params.id).then(function (resp) {
        if (resp !== null) {
          // console.log(resp);
          _this.postData = resp;
          _this.postData.content = removeVote(_this.postData.content);
          if (_this.postData.votes !== "") {
            _this.getVote(_this.postData.votes);
          }
        } else {
          console.log("查询帖子详情失败");
        }
      });
    },
    getVote(ids) {
      const _this = this;
      findByIds(ids).then(function (resp) {
        if (resp !== null) {
          console.log(resp);
          _this.voteList = resp;
        }
      });
    },
  },
  mounted() {
    this.getPostData();
  },
};
</script>

<style scoped>
.post-card {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
.post_username {
  color: #9d2933;
  font-size: larger;
  font-weight: bolder;
}
.post_title {
  margin: 0;
  color: white;
}
</style>
