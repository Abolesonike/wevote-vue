<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="16">
      <position-card :msg="positionData"></position-card>
      <el-card class="post-card" shadow="hover">
        <el-row>
          <el-col :xs="6" :sm="3" :md="3" :lg="2" :xl="2"
            ><div>
              <el-avatar
                :size="50"
                :src="postData.postUserHead"
              ></el-avatar></div
          ></el-col>
          <el-col :xs="18" :sm="21" :md="21" :lg="22" :xl="22"
            ><div>
              <span class="post_username">{{ postData.postUserName }}</span>
              <span>{{ postData.createTime }}/</span>
              <span>社区:{{ postData.community }}/</span>
              <span>点赞:{{ postLike.number }}/</span>
              <span>评论:{{ postData.commentNum }}</span>
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
            <a @click="like()"
              ><i
                style="font-size: 20px"
                v-if="postLike.isOperated === false"
                class="icon-good iconfont"
              ></i>
              <i
                style="font-size: 20px"
                v-if="postLike.isOperated === true"
                class="icon-good-fill iconfont"
              ></i
            ></a>
            {{ postLike.number }} 赞
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
            <a @click="collection()">
              <i
                style="font-size: 20px"
                v-if="postCollection.isOperated === false"
                class="icon-favorites iconfont"
              ></i>
              <i
                style="font-size: 20px"
                v-if="postCollection.isOperated === true"
                class="icon-favorites-fill iconfont"
              ></i>
            </a>
            {{ postCollection.number }} 收藏
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
            <i class="icon-xiaoxi2 iconfont"></i>
            {{ postData.commentNum }} 评论
          </el-col>
        </el-row>
        <comment-input
          :to-user-id="0"
          :type="1"
          :belong="Number(this.$route.params.id)"
          @commitComment="getComment"
          style="margin-bottom: 40px"
        ></comment-input>
        <commentCard
          v-for="comment in commentList"
          v-bind:key="comment.id"
          :comment="comment"
          @commitComment1="getComment"
        ></commentCard>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="8"
      ><div><HotPost></HotPost></div
    ></el-col>
    <el-col class="hidden-md-and-down" :xl="5"></el-col>
  </el-row>
</template>

<script>
import positionCard from "@/components/positionCard";
import HotPost from "@/components/front/HotPost";
import commentInput from "@/components/commentInput";
import commentCard from "@/components/commentCard";
import voteCard from "@/components/voteCard";

import { collection, findById, like, selectPostVo } from "@/api/post/post";
import { removeVote } from "@/tools/removeImg";
import { findByIds } from "@/api/post/vote";
import dayjs from "dayjs";
import { getComment } from "@/api/comment/comment";
import VueCookies from "vue-cookies";
import {select} from "@/api/community/community";


export default {
  name: "postDetailView",
  components: {
    commentInput,
    commentCard,
    voteCard,
    HotPost,
    positionCard,
  },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/index" },
        { name: "生活区", path: "/myCommunity/生活区" },
        { name: "详情", path: "" },
      ],
      postData: {},
      voteList: [],
      post: {
        id: 3,
      },
      community: {
        id: 0,
        status: 1,
      },
      commentList: [],
      postLike: {
        number: 0,
        isOperated: false,
      },
      postCollection: {
        number: 0,
        isOperated: false,
      },
    };
  },
  methods: {
    async getPostData() {
      const _this = this;
      await selectPostVo(1, 10, 0, _this.post).then(function (resp) {
        if (resp !== null) {
          //console.log(resp);
          _this.postData = resp.list[0];
          _this.postData.content = removeVote(_this.postData.content);
          _this.postData.createTime = dayjs(_this.postData.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          _this.positionData[1].name = _this.postData.community;
          findById(_this.post.id).then(function (resp) {
            //console.log(resp);
            _this.positionData[1].path =
              "/myCommunity/" + resp.community + "&" + _this.postData.community;
            select(1, 1, { id: resp.community }).then(function (resp) {
              window.zhuge.track("查看投票", {
                "社区" : _this.postData.community,
                "社区分类": resp.list[0].classificationName,
              });
            });
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
          console.log(resp);
          for (let i = 0; i < resp.length; i++) {
            resp[i].endDateFormat = dayjs(resp[i].endDate).format("YYYY-MM-DD");
          }
          _this.voteList = resp;
        }
      });
    },
    getComment() {
      const _this = this;
      getComment(_this.post.id).then(function (resp) {
        for (let i = 0; i < resp.length; i++) {
          // 格式化日期
          resp[i].createTime = dayjs(resp[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          for (let j = 0; j < resp[i].replay2replay.length; j++) {
            // 格式化日期
            resp[i].replay2replay[j].createTime = dayjs(
              resp[i].replay2replay[j].createTime
            ).format("YYYY-MM-DD HH:mm:ss");
          }
        }
        _this.commentList = resp;
        //console.log(resp);
      });
    },
    like() {
      const _this = this;
      like(_this.post.id, VueCookies.get("loginUserId"), 1).then(function (
        resp
      ) {
        _this.postLike.number = resp.number;
        _this.postLike.isOperated = resp.isOperated;
      });
    },
    collection() {
      const _this = this;
      collection(_this.post.id, VueCookies.get("loginUserId"), 1).then(
        function (resp) {
          _this.postCollection.number = resp.number;
          _this.postCollection.isOperated = resp.isOperated;
        }
      );
    },
    loadData() {
      const _this = this;
      _this.post.id = Number(_this.$route.params.id);
      like(this.post.id, VueCookies.get("loginUserId"), 0).then(function (
        resp
      ) {
        _this.postLike.number = resp.number;
        _this.postLike.isOperated = resp.isOperated;
      });
      collection(this.post.id, VueCookies.get("loginUserId"), 0).then(function (
        resp
      ) {
        _this.postCollection.number = resp.number;
        _this.postCollection.isOperated = resp.isOperated;
      });
      this.getPostData();
      this.getComment();
    },
  },
  mounted() {
    this.loadData();
  },
  watch: {
    $route() {
      //监听相同路由下参数变化的时候，从而实现异步刷新
      this.loading = true;
      //重新获取数据
      location.reload();
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
