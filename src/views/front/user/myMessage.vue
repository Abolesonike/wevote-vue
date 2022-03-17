<template>
  <el-card
    class="myMessageCard"
    v-for="message in messageList"
    v-bind:key="message.id"
  >
    <div style="margin-bottom: 20px">
      <span class="msgTitle"> {{ message.title }} </span>
      <span>&nbsp; {{ message.creationDate }} </span>
    </div>
    <div style="color: floralwhite" v-html="message.content"></div>
  </el-card>
  <el-pagination
    background
    :total="pageInfo.total"
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    v-model:page-size="pageInfo.pageSize"
  >
  </el-pagination>
</template>

<script>
import { getLoginUserId } from "@/api/user/user";
import { selectMessage } from "@/api/message/message";
import dayjs from "dayjs";

export default {
  name: "myMessage",
  data() {
    return {
      message: {
        userId: 0,
      },
      messageList: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
    };
  },
  methods: {
    loadData() {
      const _this = this;
      selectMessage(
        _this.pageInfo.pageNum,
        _this.pageInfo.pageSize,
        _this.message
      ).then(function (resp) {
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].creationDate = dayjs(resp.list[i].creationDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.messageList = resp.list;
        _this.pageInfo.total = resp.total;
        //console.log(resp);
      });
    },
    handleCurrentChange(currentPage) {
      const _this = this;
      _this.pageInfo.pageNum = currentPage;
      _this.loadData();
    },
  },
  mounted() {
    const _this = this;
    getLoginUserId().then(function (resp) {
      _this.message.userId = resp;
      _this.loadData();
    });
  },
};
</script>

<style scoped>
.myMessageCard {
  background: #424c50;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
.msgTitle {
  font-size: larger;
  font-weight: bolder;
  color: whitesmoke;
}
</style>
