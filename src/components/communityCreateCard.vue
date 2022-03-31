<template>
  <el-card class="communityCreateCard">
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="社区名" prop="name">
        <el-input v-model="formData.name" class="comment-input"></el-input>
      </el-form-item>
      <el-form-item label="社区分类" prop="classification">
        <el-select
          v-model="formData.classification"
          style="width: 100%"
          class="m-2"
          placeholder="Select"
        >
          <el-option
            v-for="item in commClassification"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社区简介" prop="introduction">
        <el-input
          class="comment-input"
          style="background: #424c50"
          v-model="formData.introduction"
          :autosize="{ minRows: 12, maxRows: 20 }"
          type="textarea"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="上传封面" prop="coverUrl">
        <el-image style="width: 200px" :src="formData.coverUrl"></el-image>
        <el-upload
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-change="changeCover"
        >
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button class="comment-post" @click="createCommunity()"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { selectCommClassification } from "@/api/community/communityClassification";
import { createCommunity } from "@/api/community/community";
import { ElMessage } from "element-plus";
import { getLoginUserId } from "@/api/user/user";
import { uploadImg } from "@/api/fileUpload/fileUpload";

export default {
  name: "communityCreateCard",
  data() {
    return {
      formData: {
        // 社区名称
        name: "",
        // 社区介绍
        introduction: "",
        // 社区封面
        coverUrl: "",
        // 社区分类
        classification: "",
      },
      // 社区分类
      commClassification: [],
      classification: {
        status: 1,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入社区名称！",
            trigger: "blur",
          },
        ],
        introduction: [
          {
            required: true,
            message: "请输入社区介绍！",
            trigger: "blur",
          },
        ],
        classification: [
          {
            required: true,
            message: "请选择分类！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getClassification() {
      const _this = this;
      selectCommClassification(_this.classification).then(function (resp) {
        console.log(resp);
        _this.commClassification = resp;
        _this.formData.classification = resp[0].id;
      });
    },
    createCommunity() {
      const _this = this;
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          //console.log(_this.formData);
          getLoginUserId().then(function (resp) {
            _this.formData.owner = resp;
            //console.log(_this.formData)
            createCommunity(_this.formData).then(function (resp1) {
              if (resp1 === true) {
                ElMessage({
                  message: "创建成功！等待管理员审核。",
                  type: "success",
                });
                _this.formData = {};
                _this.formData.coverUrl = "";
              }
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeCover(file) {
      // console.log(file);
      const _this = this;
      //上传文件校验
      this.otherFiles = file.raw;
      // FormData 对象
      const formData = new FormData();
      // 文件对象
      formData.append("file", this.otherFiles);
      uploadImg(formData).then((res) => {
        if (res.success === true) {
          _this.formData.coverUrl = res.downloadUrl;
          ElMessage.success("上传成功！");
        } else {
          ElMessage.error("图片上传失败:" + res.errorMsg);
        }
      });
    },
  },
  mounted() {
    this.getClassification();
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
/*.comment-input {*/
/*  --el-input-font-color: #ffff !important;*/
/*  --el-input-border: 0px !important;*/
/*  --el-input-border-color: var(--el-border-color-base);*/
/*  --el-input-border-radius: var(--el-border-radius-base);*/
/*  --el-input-background-color: #424c50 !important;*/
/*  --el-input-icon-color: var(--el-text-color-placeholder);*/
/*  --el-input-placeholder-color: var(--el-text-color-placeholder);*/
/*  --el-input-hover-border: var(--el-border-color-hover);*/
/*  --el-input-clear-hover-color: var(--el-text-color-secondary);*/
/*  --el-input-focus-border: var(--el-color-primary);*/
/*}*/
.comment-post {
  background: #424c50 !important;
  color: #ffff !important;
  --el-border-base: 0px;
  width: 100%;
}
</style>
