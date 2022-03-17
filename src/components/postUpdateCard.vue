<template>
  <el-card class="postCreateCard">
    <el-form
      label-position="top"
      :rules="rules"
      :model="postData"
      ref="postForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="postData.title"></el-input>
      </el-form-item>
      <el-form-item label="社区" prop="community">
        <el-select
          v-model="postData.community"
          placeholder="选择社区"
          style="width: 100%"
        >
          <el-option
            v-for="item in joinedCommunity"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="标签">-->
      <!--        <el-input></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="内容">
        <TEditor ref="content" :value="postData.content"></TEditor>
      </el-form-item>
      <el-form-item>
        <el-button class="postButton" @click="post()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import TEditor from "@/components/tools/TEditor.vue";
import { ElMessage } from "element-plus";

import {  findById, updatePost } from "@/api/post/post";
import { getLoginUserId } from "@/api/user/user";
import { selectUserJoinedComm } from "@/api/community/community";

export default {
  name: "postCreateCard",
  components: { TEditor },
  data() {
    return {
      centerDialogVisible: false,
      postData: {
        title: "",
        community: "",
        content: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题！",
            trigger: "blur",
          },
        ],
        community: [
          {
            required: true,
            message: "请选择社区！",
            trigger: "change",
          },
        ],
      },
      // 加入的社区
      joinedCommunity: [],
    };
  },
  methods: {
    post() {
      this.$refs["postForm"].validate((valid) => {
        if (valid) {
          // 帖子表单校验通过
          const _this = this;
          _this.postData.content = this.$refs.content.contentValue;
          if (_this.postData.content !== "") {
            // console.log(_this.postData);
            // console.log(this.$refs.content.voteData);
            for (const vote of this.$refs.content.voteData) {
              let chooses = "";
              for (let choose of vote.chooses) {
                choose = choose + ",";
                chooses += choose;
              }
              vote.chooses = chooses;
            }
            //console.log(this.$refs.content.voteData);

            updatePost(_this.postData).then(
              function (resp) {
                ElMessage({
                  message: "发布成功！",
                  type: "success",
                });
                _this.$router.go(-1);
                console.log(resp);
              }
            );
          } else {
            ElMessage.error("请输入正文内容！");
            console.log("error submit!!");
            return false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getJoinedCommunity(userId) {
      const _this = this;
      selectUserJoinedComm(userId).then(function (resp) {
        _this.joinedCommunity = resp;
        //console.log(resp);
      });
    },
  },
  mounted() {
    const _this = this;
    getLoginUserId().then(function (resp) {
      _this.getJoinedCommunity(resp);
    });
    findById(this.$route.params.id).then(function (resp) {
      _this.postData = resp;
    });
  },
};
</script>

<style scoped>
.postCreateCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
.postButton {
  width: 100%;
  margin: 10px 0;
  background: #424c50 !important;
  color: #ffff !important;
  --el-border-base: 0px;
}
</style>
