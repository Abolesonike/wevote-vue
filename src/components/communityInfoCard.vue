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
      <i class="icon-yonghu iconfont"></i>社长:{{ community.owner }} &nbsp;
      <i class="icon-taolun iconfont"></i>帖子:{{ community.postNum }} &nbsp;
      <i class="icon-tuandui iconfont"></i>成员:{{ community.userNum }}
    </p>
    <div style="height: 100px">
      <p
        style="
          margin: 0;
          font-size: small;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        "
      >
        {{ community.introduction }}
      </p>
    </div>
    <div style="text-align: center">
      <el-button v-if="isJoined === true" type="primary" @click="createPost"
        >交流发帖</el-button
      >
      <el-button
        v-if="isJoined === false"
        @click="applyFormVisible = true"
        type="primary"
        >加入社区</el-button
      >
    </div>
  </el-card>

  <el-dialog v-model="applyFormVisible" title="社区申请">
    <el-form :model="communityApply" label-position="top">
      <el-form-item label="申请理由">
        <el-input
          :rows="5"
          type="textarea"
          placeholder="请输入申请理由。。。"
          v-model="communityApply.applyReason"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="applyFormVisible = false">取消</el-button>
        <el-button type="primary" @click="applyConfirm()">提交申请</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { checkIsJoined, select } from "@/api/community/community";
import { getLoginUserId, selectUser } from "@/api/user/user";
import { insertCommApply } from "@/api/community/communityApply";
import { ElMessage } from "element-plus";

export default {
  name: "communityInfoCard",
  data() {
    return {
      community: {
        id: 0,
        owner: 0,
      },
      sysUser: {
        userId: 0,
      },
      communityApply: {
        applyUserId: 0,
        applyCommunity: 0,
        applyReason: "",
      },
      isJoined: false,
      applyFormVisible: false,
    };
  },
  methods: {
    createPost() {
      this.$router.push("/postCreate");
    },
    selectCommunity() {
      const _this = this;
      select(1, 1, _this.community).then(function (resp) {
        _this.community = resp.list[0];
        _this.sysUser.userId = _this.community.owner;
        selectUser(1, 1, _this.sysUser).then(function (resp) {
          _this.community.owner = resp.list[0].username;
        });
      });
    },
    applyConfirm() {
      const _this = this;
      _this.communityApply.applyCommunity = _this.community.id;
      insertCommApply(_this.communityApply).then(function (resp) {
        if (resp.code === 200) {
          _this.applyFormVisible = false;
          ElMessage.success(resp.message);
        } else {
          _this.applyFormVisible = false;
          ElMessage.error(resp.message);
        }
      });
    },
  },
  mounted() {
    const _this = this;
    _this.community.id = Number(this.$route.path.split("&")[0].split("/")[2]);
    _this.selectCommunity();
    getLoginUserId().then(function (resp) {
      _this.communityApply.applyUserId = resp;
      checkIsJoined(_this.community.id, resp).then(function (resp1) {
        _this.isJoined = resp1;
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
