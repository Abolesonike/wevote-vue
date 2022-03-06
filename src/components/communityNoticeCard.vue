<template>
  <el-card class="hostPostCard" shadow="hover">
    <p style="color: white">社区公告</p>
    <div v-for="notice in noticeList" v-bind:key="notice.id">
      <p>
        {{ notice.title
        }}<span style="font-size: 12px; color: gray"
          >&nbsp;{{ notice.creationDate }}</span
        >
      </p>
    </div>
  </el-card>
</template>

<script>
import { selectNotice } from "@/api/community/notice";
import dayjs from "dayjs";

export default {
  name: "communityNoticeCard",

  data() {
    return {
      notice: {
        community: 0,
      },
      noticeList: [],
    };
  },
  methods: {
    loadData() {
      const _this = this;
      selectNotice(1, 10, _this.notice).then(function (resp) {
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].creationDate = dayjs(resp.list[i].creationDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.noticeList = resp.list;
      });
    },
  },
  mounted() {
    const _this = this;
    _this.notice.community = Number(
      this.$route.path.split("&")[0].split("/")[2]
    );
    this.loadData();
  },
};
</script>

<style scoped>
.hostPostCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
