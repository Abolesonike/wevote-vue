<template>
  <el-card class="communityCreateCard">
    <el-form label-position="top">
      <el-form-item label="社区名">
        <el-input class="comment-input"></el-input>
      </el-form-item>
      <el-form-item label="社区简介">
        <el-input
          class="comment-input"
          style="background: #424c50"
          v-model="commentArea"
          :autosize="{ minRows: 12, maxRows: 20 }"
          type="textarea"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="上传封面">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button class="comment-post">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "communityCreateCard",
  data() {
    return {
      formData: {},
    };
  },
};
</script>

<style scoped>
.communityCreateCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
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
  width: 100%;
}
</style>
