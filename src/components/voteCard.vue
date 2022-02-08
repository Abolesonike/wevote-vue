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
      <el-checkbox
        :disabled="checkboxSelectAble[index]"
        class="choose"
        :label="choose"
        :value="index + choose"
        @change="handleCheckedChange"
      ></el-checkbox>
      <div class="grid-content bg-purple-light">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="percentage(index)"
          v-if="isVoted === true"
        >
          {{ voteData.voteNumber[index] }}票 {{ percentage(index) }}%
        </el-progress>
      </div>
    </div>
    <p style="text-align: center; font-size: 12px" v-if="!isVoted">
      投票后查看结果
    </p>
    <el-button
      @click="voteForThisVote()"
      class="vote-post"
      v-if="isVoted === false"
      >投票</el-button
    >
    <el-button class="vote-post" v-if="isVoted === true" disabled
      >已投票
    </el-button>
  </div>
</template>

<script>
import { getLoginUserId } from "@/api/user/user";
import { voteFor } from "@/api/post/vote";
import { ElMessage } from "element-plus";

export default {
  name: "voteCard",
  props: {
    vote: {},
  },
  data() {
    return {
      voteData: this.vote,
      isVoted: false,
      total: 0,
      loginUserId: "",
      currentSelectNumber: 0,
      checkboxSelectAble: [],
      checkboxStatus: [],
    };
  },
  mounted() {
    this.isVote();
    // console.log(this.voteData);
    // console.log(this.isVoted);
    let voteNumber = this.voteData.voteNumber.split(",");
    voteNumber.pop();
    this.voteData.voteNumber = voteNumber;
    // 投票总人数
    if (this.voteData.voteUser === "") {
      this.total = 0;
    } else {
      for (let i = 0; i < this.voteData.voteNumber.length; i++) {
        this.total += Number(this.voteData.voteNumber[i]);
      }
    }
    // 初始化选项
    const chooses = this.voteData.chooses.split(",");
    chooses.pop();
    for (let i = 0; i < chooses.length; i++) {
      this.checkboxSelectAble.push(false);
      this.checkboxStatus.push(false);
    }
  },
  methods: {
    isVote() {
      // 判断用户是否投票
      const _this = this;
      getLoginUserId().then(function (resp) {
        _this.loginUserId = resp.toString();
        // console.log(typeof loginUserId);
        if (_this.voteData.voteUser === null) {
          return;
        }
        let votedUserIdList = _this.voteData.voteUser.split(",");
        votedUserIdList.pop();
        if (votedUserIdList.includes(_this.loginUserId)) {
          _this.isVoted = true;
        }
      });
    },
    voteForThisVote() {
      // 检查选项是否全为false
      let checkboxFalseCount = 0;
      for (let i = 0; i < this.checkboxStatus.length; i++) {
        if (this.checkboxStatus[i] === false) {
          checkboxFalseCount += 1;
        }
      }
      if (checkboxFalseCount === this.checkboxStatus.length) {
        ElMessage.error({
          message: "至少选择一项！",
        });
        return;
      }
      // 把投票数还原为String
      let voteNumberStr = "";
      for (let i = 0; i < this.voteData.voteNumber.length; i++) {
        voteNumberStr += this.voteData.voteNumber[i];
        voteNumberStr += ",";
      }
      this.voteData.voteNumber = voteNumberStr;
      // 设置投票用户id
      this.voteData.voteUser += this.loginUserId;
      this.voteData.voteUser += ",";
      voteFor(this.voteData).then(function (resp) {
        if (resp != null) {
          ElMessage.success({
            message: "投票成功",
            type: "success",
          });
          location.reload();
        }
      });
    },
    handleCheckedChange(value, key) {
      // 选择框改变事件
      key = key.target._value;
      // 得到选项的index
      let index = 0;
      let list = this.voteData.chooses.split(",");
      list.pop();
      for (let i = 0; i < list.length; i++) {
        if (list[i] === key) {
          break;
        } else {
          index += 1;
        }
      }
      if (value === true) {
        this.currentSelectNumber += 1;
        this.checkboxStatus[index] = true;
        this.total += 1;
        // 判断目前选择的选项是否大于最大选项
        if (this.currentSelectNumber >= this.voteData.multiChoose) {
          for (let i = 0; i < this.checkboxSelectAble.length; i++) {
            if (this.checkboxStatus[i] === false) {
              this.checkboxSelectAble[i] = true;
            }
          }
          this.checkboxSelectAble[index] = false;
        }
        // 更新的票数
        this.voteData.voteNumber[index] = (
          Number(this.voteData.voteNumber[index]) + 1
        ).toString();
      } else {
        // 更新的票数
        this.voteData.voteNumber[index] = (
          Number(this.voteData.voteNumber[index]) - 1
        ).toString();
        this.currentSelectNumber -= 1;
        this.total -= 1;
        this.checkboxStatus[index] = false;
        // 判断目前选择的选项是否大于最大选项
        if (this.currentSelectNumber <= this.voteData.multiChoose) {
          for (let i = 0; i < this.checkboxSelectAble.length; i++) {
            this.checkboxSelectAble[i] = false;
          }
        }
      }
      console.log(this.voteData.voteNumber);
      console.log(this.currentSelectNumber);
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
        if (this.voteData.voteUser === null) {
          return 0;
        } else {
          return Math.round(
            (this.voteData.voteNumber[index] / this.total) * 100
          );
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
