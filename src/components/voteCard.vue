<template>
  <div class="vote-card">
    <span class="title"
      ><i class="icon-toupiao iconfont"></i> {{ this.voteData.title }}</span
    >
    <br />
    <p style="color: #d1d9e0">
      {{ participation }}人参与·距离结束还要3天14小时24分
    </p>
    <div v-for="(choose, index) in separateChooses" v-bind:key="choose">
      <el-checkbox class="choose" :label="choose"></el-checkbox>
      <el-progress
        :text-inside="true"
        :stroke-width="18"
        :percentage="percentage(index)"
        v-if="isVoted === true"
      >
        {{ voteData.voteNumber[index] }}票 {{ percentage(index) }}%
      </el-progress>
    </div>
    <p style="text-align: center; font-size: 12px" v-if="!isVoted">
      投票后查看结果
    </p>
    <el-button class="vote-post" v-if="isVoted === false">投票</el-button>
    <el-button class="vote-post" v-if="isVoted === true" disabled
      >已投票</el-button
    >
  </div>
</template>

<script>
import { getLoginUserId } from "@/api/user/user";

export default {
  name: "voteCard",
  props: {
    vote: {},
  },
  data() {
    return {
      voteData: this.vote,
      isVoted: false,
    };
  },
  mounted() {
    this.isVote();
    // console.log(this.isVoted);
    let voteNumber = this.voteData.voteNumber.split(",");
    voteNumber.pop();
    this.voteData.voteNumber = voteNumber;
  },
  methods: {
    isVote() {
      let loginUserId = "";
      const _this = this;
      getLoginUserId().then(function (resp) {
        loginUserId = resp.toString();
        console.log(typeof loginUserId);
        if (_this.voteData.voteUser === null) {
          return;
        }
        let votedUserIdList = _this.voteData.voteUser.split(",");
        votedUserIdList.pop();
        if (votedUserIdList.includes(loginUserId)) {
          _this.isVoted = true;
        }
      });
    },
  },
  computed: {
    separateChooses() {
      // 分开选项
      let list = this.voteData.chooses.split(",");
      list.pop();
      return list;
    },
    participation() {
      // 计算参与人数
      if (this.voteData.voteUser === null) {
        return 0;
      } else {
        return this.voteData.voteUser.split(",").length - 1;
      }
    },
    percentage() {
      // 计算投票比例
      return (index) => {
        let total = 0;
        if (this.voteData.voteUser == null) {
          return 0;
        } else {
          total = this.voteData.voteUser.split(",").length - 1;
          return Math.round((this.voteData.voteNumber[index] / total) * 100);
        }
      };
    },
  },
};
</script>

<style scoped>
.vote-card {
  background: #424c50;
  padding: 10px;
  margin: 10px 0 10px 0;
  border-radius: 10px;
}
.title {
  color: #d1d9e0;
  font-size: x-large;
  font-weight: bolder;
}
.choose {
  color: #d1d9e0;
}
.vote-divider {
  margin: 5px 0;
}
.vote-post {
  width: 100%;
  margin: 10px 0;
  background: #50616d !important;
  color: #ffff !important;
  --el-border-base: 0px;
}
</style>
