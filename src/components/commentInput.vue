<template>
  <el-form :model="comment">
    <el-form-item>
      <el-input
        class="comment-input"
        style="background: #424c50"
        v-model="comment.content"
        :autosize="{ minRows: 8, maxRows: 16 }"
        type="textarea"
        placeholder="留下你的想法。。。"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="comment-post" @click="commit()">发送</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import VueCookies from "vue-cookies";
import { sendComment } from "@/api/comment/comment";
import { ElMessage } from "element-plus";

export default {
  emits: ["commitComment"],
  name: "commentInput",
  props: {
    toUserId: Number,
    type: Number,
    belong: Number,
    toComment: Number,
  },
  data() {
    return {
      comment: {
        fromUserId: 0,
        toUserId: this.toUserId,
        replayType: this.type,
        belong: this.belong,
        toComment: this.toComment,
        content: "",
      },
    };
  },
  methods: {
    commit() {
      const _this = this;
      console.log(_this.comment);
      sendComment(_this.comment).then(function (resp) {
        if (resp === true) {
          ElMessage({
            message: "评论成功",
            type: "success",
          });
          _this.comment.content = "";
          _this.$emit("commitComment");
        }
      });
    },
  },
  mounted() {
    const _this = this;
    _this.comment.fromUserId = VueCookies.get("loginUserId");
  },
};
</script>

<style scoped>
.comment-input {
  --el-input-font-color: #ffff !important;
  --el-input-border: 0px !important;
  --el-input-border-color: var(--el-border-color-base);
  --el-input-border-radius: var(--el-border-radius-base);
  --el-input-background-color: #424c50 !important;
  --el-input-icon-color: var(--el-text-color-placeholder);
  --el-input-placeholder-color: var(--el-text-color-placeholder);
  --el-input-hover-border: var(--el-border-color-hover);
  --el-input-clear-hover-color: var(--el-text-color-secondary);
  --el-input-focus-border: var(--el-color-primary);
}
.comment-post {
  background: #424c50 !important;
  color: #ffff !important;
  --el-border-base: 0px;
}
</style>
