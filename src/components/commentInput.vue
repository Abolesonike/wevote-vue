<template>
  <el-form>
    <el-form-item>
      <el-input
        class="comment-input"
        style="background: #424c50"
        v-model="commentArea"
        :autosize="{ minRows: 8, maxRows: 16 }"
        type="textarea"
        placeholder="留下你的想法。。。"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="comment-post">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "commentInput",
  data() {
    return {
      commentArea: "",
    };
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
