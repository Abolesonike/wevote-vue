<template>
  <el-container>
    <el-header style="background-color: #50616d">
      <Header></Header>
    </el-header>
    <el-main style="background-color: #424c50; overflow-x: hidden">
      <el-row>
        <el-col class="hidden-md-and-down" :xl="2"></el-col>
        <el-col :xs="0" :sm="0" :md="6" :lg="4" :xl="4"
          ><aside-menu style="margin: 10px"></aside-menu
        ></el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="10">
          <position-card :msg="positionData"></position-card>
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
                  <span class="post_username">{{ postData.postUserName }}</span>
                  <span>{{ postData.createTime }}/</span>
                  <span>社区:{{ postData.community }}/</span>
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
              v-for="(p, index) in postData.content"
              v-bind:key="p"
            >
              <div v-html="p"></div>
              <vote-card
                :vote="voteList[index]"
                v-if="voteList[index] !== undefined"
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
        </el-col>
        <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="6"
          ><div><HotPost></HotPost></div
        ></el-col>
        <el-col class="hidden-md-and-down" :xl="5"></el-col>
      </el-row>
    </el-main>
    <el-footer style="background-color: #50616d; height: 100px">
      <Footer></Footer>
    </el-footer>
  </el-container>
  <el-backtop />
</template>

<script>
import Header from "@/components/Header";
import positionCard from "@/components/positionCard";
import AsideMenu from "@/components/AsideMenu";
import HotPost from "@/components/front/HotPost";
import Footer from "@/components/Footer";
import commentInput from "@/components/commentInput";
import commentCard from "@/components/commentCard";
import voteCard from "@/components/voteCard";

import { findById, selectPostVo } from "@/api/post/post";
import { removeVote } from "@/tools/removeImg";
import { findByIds } from "@/api/post/vote";
import dayjs from "dayjs";

export default {
  name: "postDetailView",
  components: {
    Header,
    AsideMenu,
    commentInput,
    commentCard,
    voteCard,
    HotPost,
    positionCard,
    Footer,
  },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "生活区", path: "/myCommunity/生活区" },
        { name: "详情", path: "" },
      ],
      postData: {},
      voteList: [],
      post: {
        id: 0,
      },
      community: {
        id: 0,
        status: 1,
      },
    };
  },
  methods: {
    async getPostData() {
      const _this = this;
      await selectPostVo(1, 10, _this.post).then(function (resp) {
        if (resp !== null) {
          //console.log(resp);
          _this.postData = resp.list[0];
          _this.postData.content = removeVote(_this.postData.content);
          _this.postData.createTime = dayjs(_this.postData.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          _this.positionData[1].name = _this.postData.community;
          findById(_this.post.id).then(function (resp) {
            console.log(resp);
            _this.positionData[1].path =
              "/myCommunity/" + resp.community + "&" + _this.postData.community;
          });
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
          //console.log(resp);
          _this.voteList = resp;
        }
      });
    },
  },
  mounted() {
    const _this = this;
    _this.post.id = _this.$route.params.id;
    this.getPostData();
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
