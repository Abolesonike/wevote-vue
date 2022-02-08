<template>
  <h3>基本信息</h3>
  <el-descriptions class="margin-top" title="" :column="3" border>
    <el-descriptions-item :span="2">
      <template #label> 标题 </template>
      {{ postData.title }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 发送者id </template>
      {{ postData.postUserId }}
    </el-descriptions-item>
    <el-descriptions-item :span="2">
      <template #label> 发送时间 </template>
      {{ postData.createTime }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 状态 </template>
      {{ postData.status }}
    </el-descriptions-item>
  </el-descriptions>
  <h3>正文</h3>
  <div v-html="postData.content"></div>
  <h3>投票</h3>
  <div v-for="vote in voteData" v-bind:key="vote" style="margin-bottom: 20px">
    <el-descriptions class="margin-top" title="" :column="3" border>
      <el-descriptions-item :span="2">
        <template #label> 标题 </template>
        {{ vote.title }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> 多选 </template>
        {{ vote.multiChoose }}
      </el-descriptions-item>
      <el-descriptions-item :span="4">
        <template #label> 选项 </template>
        {{ vote.chooses }}
      </el-descriptions-item>
      <el-descriptions-item :span="4">
        <template #label> 得票数 </template>
        {{ vote.voteNumber }}
      </el-descriptions-item>
      <el-descriptions-item :span="4">
        <template #label> 投票用户 </template>
        {{ vote.voteUser }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { findById } from "@/api/post/vote";
export default {
  name: "postDetail",
  props: {
    rowData: Object,
  },
  data() {
    return {
      postData: this.rowData,
      voteData: [],
    };
  },
  mounted() {
    const _this = this;
    const votes = this.postData.votes.split(",");
    votes.pop();
    for (let id of votes) {
      findById(id).then(function (resp) {
        _this.voteData.push(resp);
      });
    }
  },
};
</script>

<style></style>
