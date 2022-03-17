<template>
  <div v-for="postData in postDataList" v-bind:key="postData">
    <Card style="background: #424c50" :postData="postData"></Card>
  </div>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="pageInfo.total"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script>
import Card from "@/components/Card";
import VueCookies from "vue-cookies";
import { myLike } from "@/api/post/post";
import dayjs from "dayjs";
import { removeImg, removeVote } from "@/tools/removeImg";
export default {
  name: "myLike",
  components: { Card },
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      userId: 0,
      postDataList: [],
    };
  },
  methods: {
    loadData() {
      const _this = this;
      myLike(
        _this.pageInfo.pageNum,
        _this.pageInfo.pageSize,
        _this.userId
      ).then(function (resp) {
        // console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          // 去掉内容中的图片
          const data = removeImg(resp.list[i].content);
          resp.list[i].content = data["content"];
          resp.list[i].imgList = data["imgs"];
          // 去掉投票
          resp.list[i].content = removeVote(resp.list[i].content);
          // console.log(resp.list[i].content)
        }
        _this.postDataList = resp.list;
        _this.pageInfo.total = resp.total;
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      _this.pageInfo.pageNum = currentPageNum;
      _this.loadData();
    },
  },
  mounted() {
    const _this = this;
    _this.userId = VueCookies.get("loginUserId");
    this.loadData();
  },
};
</script>

<style scoped></style>
