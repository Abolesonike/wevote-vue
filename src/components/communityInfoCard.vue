<template>
  <el-card class="communityInfoCard">
    <el-image
      src="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      style="width: 100%"
      fit="contain"
    ></el-image>
    <div style="text-align: center">
      <h4 style="margin: 0; color: #9d2933">{{ community.name }}</h4>
    </div>
    <p style="margin: 0; font-size: small; text-align: center">
      <i class="icon-yonghu iconfont"></i>社长:{{ community.owner }}
      <i class="icon-taolun iconfont"></i>帖子:1000
      <i class="icon-tuandui iconfont"></i>成员:200
    </p>
    <div style="height: 100px">
      <p style="margin: 0; font-size: small">
        {{ community.introduction }}
      </p>
    </div>
    <div style="text-align: center">
      <el-button v-if="isJoined === true" type="primary" @click="createPost"
        >交流发帖</el-button
      >
      <el-button v-if="isJoined === false" type="primary">加入社区</el-button>
    </div>
  </el-card>
</template>

<script>
import { select, selectCommAdmin } from "@/api/community/community";
import { findUserById, getLoginUserId } from "@/api/user/user";

export default {
  name: "communityInfoCard",
  data() {
    return {
      community: {
        id: 0,
      },
      isJoined: false,
    };
  },
  methods: {
    createPost() {
      this.$router.push("/postCreate");
    },
    selectCommunity() {
      const _this = this;
      select(_this.community).then(function (resp) {
        _this.community = resp[0];
        findUserById(_this.community.owner).then(function (resp) {
          _this.community.owner = resp.username;
        });
      });
    },
  },
  mounted() {
    const _this = this;
    _this.community.id = Number(this.$route.path.split("&")[0].split("/")[2]);
    _this.selectCommunity();
    getLoginUserId().then(function (resp) {
      const userId = resp;
      selectCommAdmin(_this.community.id).then(function (resp) {
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].userId === userId) {
            _this.isJoined = true;
            break;
          }
        }
      });
    });
  },
};
</script>

<style scoped>
.communityInfoCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
  /*text-align: center;*/
}
</style>
