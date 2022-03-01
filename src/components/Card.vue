<template>
  <el-card class="box-card" shadow="hover">
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
          <span class="post_username">{{ post.postUserName }}</span>
          <span class="post_time">&nbsp; {{ post.createTime }}</span>
        </div>
        <div>
          <router-link
            :to="{ name: 'postDetailView', params: { id: post.id } }"
          >
            <h3 class="post_title">{{ post.title }}</h3>
          </router-link>
        </div></el-col
      >
    </el-row>
    <div class="contentDiv" v-for="p in post.content" v-bind:key="p">
      <div v-html="p"></div>
    </div>
    <!-- imgSmall -->
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="8"
        :md="8"
        :lg="8"
        :xl="8"
        v-for="img in srcListSmall"
        v-bind:key="img"
      >
        <el-image
          style="width: 100%"
          :src="img"
          fit="cover"
          :preview-src-list="srcListSmall"
        ></el-image
      ></el-col>
    </el-row>
    <!-- imgBig -->
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        v-for="img in srcListBig"
        v-bind:key="img"
        ><el-image
          style="width: 100%"
          :src="img"
          fit="cover"
          :preview-src-list="srcListBig"
        ></el-image
      ></el-col>
    </el-row>
    <!-- icon -->
    <el-row style="margin-top: 15px">
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <i class="icon-zan iconfont"></i>
        {{ post.likes }} 赞！
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <i class="icon-xiaoxi2 iconfont"></i>
        30 评论
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <i class="icon-fenxiang iconfont"></i>
        4 分享
      </el-col>
    </el-row>
    <el-button
      v-show="this.$route.path === '/userHome'"
      style="margin-top: 20px"
      >删除</el-button
    >
  </el-card>
</template>

<script>

export default {
  name: "Card",
  props: {
    postData: {},
  },
  data() {
    return {
      post: this.postData,
      srcListSmall: this.postData.imgList,
      srcListBig: [],
    };
  },
  mounted() {
    if (this.srcListSmall.length === 4) {
      this.srcListBig[0] = this.srcListSmall[3];
      this.srcListSmall.pop();
    } else if (this.srcListSmall.length >= 5) {
      this.srcListBig[0] = this.srcListSmall[3];
      this.srcListBig[1] = this.srcListSmall[5];
      this.srcListSmall = this.srcListSmall.slice(0, 3);
    }
  },
};
</script>

<style scoped>
.box-card {
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
.post_time {
  color: #808080;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
.contentDiv {
  color: #d1d9e0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}
</style>
