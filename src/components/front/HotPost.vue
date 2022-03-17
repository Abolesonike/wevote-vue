<template>
  <el-card class="hostPostCard" shadow="hover">
    <p style="color: whitesmoke; font-size: 18px">热门推荐</p>
    <div v-for="post in postDataList" v-bind:key="post.id">
      <p>
        <router-link :to="{ name: 'postDetailView', params: { id: post.id } }"
          ><span style="color: whitesmoke"
            >{{ post.title }}&nbsp;</span
          ></router-link
        ><span style="font-size: 12px; color: grey">{{ post.createTime }}</span>
      </p>
    </div>
  </el-card>
</template>
<script>
import { selectPostVo } from "@/api/post/post";
import dayjs from "dayjs";

export default {
  name: "HotPost",
  data() {
    return {
      postDataList: [],
      post: {
        status: 2,
        community: 0,
      },
    };
  },
  methods: {
    loadData() {
      // 加载帖子列表
      const _this = this;
      selectPostVo(1, 5, 1, _this.post).then(function (resp) {
        // console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
            "YYYY-MM-DD"
          );
        }
        _this.postDataList = resp.list;
        // console.log(_this.postDataList);
      });
    },
  },
  mounted() {
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
.el-card__body {
  padding: 0;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
