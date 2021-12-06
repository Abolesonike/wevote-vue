<template>
  <div class="commentCard" v-for="(count, index) in 5" v-bind:key="count">
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
          <span class="post_username">云玩家</span> <br />
          <span class="post_time"> 2021/10/26 17:13</span>
        </div>
      </el-col>
    </el-row>
    <p>太棒啦！</p>
    <el-row>
      <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="2">
        <i class="icon-zan iconfont"></i>
        <span class="likeText"> {{ index }}</span>
      </el-col>
      <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="2">
        <i class="icon-xiaoxi2 iconfont" @click="showCommentInput(index)"></i>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="commentInputShow[index]">
        <comment-input></comment-input>
      </div>
    </el-collapse-transition>
    <el-divider class="comment-divider"></el-divider>
  </div>
</template>

<script>
import commentInput from "@/components/commentInput";
export default {
  name: "commentCard",
  components: { commentInput },
  data() {
    return {
      commentInputShow: [],
    };
  },
  mounted() {
    for (let i = 0; i < 5; i++) {
      this.commentInputShow[i] = false;
    }
    // console.log(this.commentInputShow);
  },
  methods: {
    showCommentInput(index) {
      this.commentInputShow[index] = !this.commentInputShow[index];
    },
  },
};
</script>

<style scoped>
.commentCard {
  background-color: #50616d;
  margin: 20px;
}
</style>

<style>
.comment-divider {
  background-color: #424c50 !important;
}
</style>
