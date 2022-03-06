<template>
  <el-container>
    <el-header style="background-color: #50616d">
      <Header></Header>
    </el-header>
    <el-main
      style="background-color: #424c50; overflow-x: hidden; height: 100%"
    >
      <el-row style="background-color: #424c50">
        <el-col class="hidden-md-and-down" :xl="2"></el-col>
        <el-col :xs="0" :sm="0" :md="6" :lg="4" :xl="4"
          ><aside-menu style="margin: 10px"></aside-menu
        ></el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="14">
          <position-card :msg="positionData"></position-card>
          <el-card class="manageCard">
            <el-tabs>
              <el-tab-pane label="社区详情" v-model="community">
                <div>
                  <h4>{{ community.name }}</h4>
                </div>
                <el-image
                  src="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
                  style="width: 50%"
                  fit="contain"
                ></el-image>
                <p style="font-size: small">
                  <i class="icon-taolun iconfont"></i>帖子:{{
                    community.postNum
                  }}
                  <i class="icon-tuandui iconfont"></i>成员:{{
                    community.userNum
                  }}
                </p>
                <div>
                  <p>
                    {{ community.introduction }}
                  </p>
                </div>
                <el-button>社区介绍</el-button>
              </el-tab-pane>
              <el-tab-pane label="社区成员">
                <el-form
                  ref="numberForm"
                  :inline="true"
                  :model="user"
                  class="demo-form-inline"
                >
                  <el-form-item size="small" prop="username">
                    <el-input
                      placeholder="用户名"
                      v-model="user.username"
                    ></el-input>
                  </el-form-item>
                  <el-form-item size="small" prop="commJoinedTimeStart">
                    <el-date-picker
                      v-model="user.commJoinedTimeStart"
                      type="date"
                      placeholder="加入日期从"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item size="small" prop="commJoinedTimeEnd">
                    --
                    <el-date-picker
                      v-model="user.commJoinedTimeEnd"
                      type="date"
                      placeholder="加入日期至"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item size="small">
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      @click="loadCommunityMember()"
                      >查询</el-button
                    >
                    <el-button
                      icon="el-icon-refresh-left"
                      @click="resetForm('numberForm')"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
                <el-table :data="userList" style="width: 100%">
                  <el-table-column prop="username" label="用户名" width="120" />
                  <el-table-column prop="postNum" label="发帖" width="80" />
                  <!-- <el-table-column prop="commentNum" label="评论" width="80" />-->
                  <!-- <el-table-column prop="likeNum" label="点赞" width="80" />-->
                  <el-table-column prop="postNum" label="角色" width="180">
                    <template v-slot="scope">
                      <el-select
                        v-model="scope.row.commRole"
                        class="m-2"
                        placeholder="Select"
                        size="small"
                      >
                        <el-option label="社区组长" :value="1"></el-option>
                        <el-option label="管理员" :value="2"></el-option>
                        <el-option label="成员" :value="3"> </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="commJoinedTime"
                    label="加入时间"
                    width="180"
                  />
                  <el-table-column label="操作">
                    <el-button type="primary">移出</el-button>
                  </el-table-column>
                </el-table>
                <br />
                <el-pagination
                  background
                  :total="userPageInfo.total"
                  @current-change="handleUserCurrentChange"
                  layout="prev, pager, next"
                  v-model:page-size="userPageInfo.pageSize"
                >
                </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="成员申请">
                <el-form
                  :inline="true"
                  :model="communityApply"
                  class="demo-form-inline"
                  ref="applyForm"
                >
                  <el-form-item size="small" prop="applyUserName">
                    <el-input
                      placeholder="用户名"
                      v-model="communityApply.applyUserName"
                    ></el-input>
                  </el-form-item>
                  <el-form-item size="small" prop="applyTimeStart">
                    <el-date-picker
                      v-model="communityApply.applyTimeStart"
                      type="date"
                      placeholder="申请日期从"
                    >
                    </el-date-picker>
                  </el-form-item>
                  --
                  <el-form-item size="small" prop="applyTimeEnd">
                    <el-date-picker
                      v-model="communityApply.applyTimeEnd"
                      type="date"
                      placeholder="申请日期至"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item size="small">
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      @click="loadCommunityApply()"
                      >查询</el-button
                    >
                    <el-button
                      icon="el-icon-refresh-left"
                      @click="resetForm('applyForm')"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
                <el-table :data="communityApplyList" style="width: 100%">
                  <el-table-column
                    prop="applyUserName"
                    label="申请用户"
                    width="120"
                  />
                  <el-table-column
                    prop="applyTime"
                    label="申请时间"
                    width="200"
                  />
                  <el-table-column
                    prop="applyReason"
                    label="申请理由"
                    width="500"
                  />
                  <el-table-column label="操作">
                    <template v-slot="scope">
                      <el-button type="primary" @click="applyAgree(scope.row)"
                        >通过</el-button
                      >
                      <el-button
                        type="primary"
                        @click="applyDisagree(scope.row)"
                        >拒绝</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <br />
                <el-pagination
                  background
                  :total="applyPageInfo.total"
                  @current-change="handleApplyCurrentChange"
                  layout="prev, pager, next"
                  v-model:page-size="applyPageInfo.pageSize"
                >
                </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="发帖管理">
                <el-form
                  ref="postForm"
                  :inline="true"
                  :model="post"
                  class="demo-form-inline"
                >
                  <el-form-item size="small" prop="title">
                    <el-input
                      placeholder="标题"
                      v-model="post.title"
                    ></el-input>
                  </el-form-item>
                  <el-form-item size="small" prop="postUserName">
                    <el-input
                      placeholder="发送者"
                      v-model="post.postUserName"
                    ></el-input>
                  </el-form-item>
                  <el-form-item size="small" prop="createTimeStart">
                    <el-date-picker
                      v-model="post.createTimeStart"
                      type="date"
                      placeholder="发送日期从"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item size="small" prop="createTimeEnd">
                    <el-date-picker
                      v-model="post.createTimeEnd"
                      type="date"
                      placeholder="发送日期至"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item size="small">
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      @click="loadCommunityPost()"
                      >查询</el-button
                    >
                    <el-button
                      icon="el-icon-refresh-left"
                      @click="resetForm('postForm')"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
                <el-table :data="postList" style="width: 100%">
                  <el-table-column prop="title" label="标题" width="250" />

                  <el-table-column
                    prop="postUserName"
                    label="发送者"
                    width="80"
                  />
                  <el-table-column prop="likes" label="点赞" width="80" />
                  <el-table-column
                    prop="createTime"
                    label="发送时间"
                    width="200"
                  />
                  <el-table-column label="操作">
                    <el-button type="primary">详情</el-button>
                    <el-button type="primary">删除</el-button>
                    <el-button type="primary">精华</el-button>
                  </el-table-column>
                </el-table>
                <br />
                <el-pagination
                  background
                  :total="postPageInfo.total"
                  @current-change="handlePostCurrentChange"
                  layout="prev, pager, next"
                  v-model:page-size="postPageInfo.pageSize"
                >
                </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="公告管理">
                <el-form
                  ref="noticeForm"
                  :model="notice"
                  :rules="noticeRules"
                  size="small"
                  label-position="top"
                >
                  <el-form-item label="公告标题" prop="title">
                    <el-input
                      v-model="notice.title"
                      class="comment-input"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="公告内容" prop="content">
                    <el-input
                      class="comment-input"
                      style="background: #424c50"
                      v-model="notice.content"
                      :autosize="{ minRows: 6, maxRows: 12 }"
                      type="textarea"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="postNotice()">发布通知</el-button>
                  </el-form-item>
                </el-form>
                <el-table :data="noticeList" style="width: 100%">
                  <el-table-column prop="title" label="标题" width="180" />
                  <el-table-column
                    prop="postUserName"
                    label="发布者"
                    width="80"
                  />
                  <el-table-column prop="content" label="内容" width="280" />
                  <el-table-column prop="status" label="类型" width="150">
                    <template v-slot="scope">
                      <el-select
                        v-model="scope.row.status"
                        class="m-2"
                        placeholder="Select"
                        size="small"
                        @change="changeNoticeStatus(scope.row)"
                      >
                        <el-option label="普通公告" :value="1"> </el-option>
                        <el-option label="置顶公告" :value="2"> </el-option>
                        <el-option label="必读公告" :value="3"> </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="creationDate"
                    label="发布时间"
                    width="180"
                  />
                  <el-table-column label="操作">
                    <el-button type="primary">删除</el-button>
                  </el-table-column>
                </el-table>
                <br />
                <el-pagination
                  background
                  :total="noticePageInfo.total"
                  @current-change="handleNoticeCurrentChange"
                  layout="prev, pager, next"
                  v-model:page-size="noticePageInfo.pageSize"
                >
                </el-pagination>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <el-col class="hidden-md-and-down" :xl="5"></el-col>
      </el-row>
    </el-main>
    <el-footer style="background-color: #50616d; height: 100px">
      <Footer></Footer>
    </el-footer>
  </el-container>
  <el-backtop />
</template>

<script>
import Header from "@/components/Header";
import AsideMenu from "@/components/AsideMenu";
import positionCard from "@/components/positionCard";
import Footer from "@/components/Footer";
import { select, selectCommAdmin } from "@/api/community/community";
import dayjs from "dayjs";
import {
  applyAgree,
  applyDisagree,
  selectCommApply,
} from "@/api/community/communityApply";
import { ElMessage } from "element-plus";
import { selectPostVo } from "@/api/post/post";
import {
  insertNotice,
  selectNotice,
  updateNotice,
} from "@/api/community/notice";
import { getLoginUserId } from "@/api/user/user";
export default {
  name: "communityManageView",
  components: { Header, AsideMenu, positionCard, Footer },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "我创建的社区", path: "/myCreatedCommunity" },
        { name: decodeURI(this.$route.path.split("&")[1]), path: "" },
      ],
      userPageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      applyPageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      postPageInfo: {
        pageNum: 1,
        pageSize: 6,
        total: 0,
      },
      noticePageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      community: {
        id: 0,
      },
      user: {
        username: "",
        commJoinedTimeEnd: "",
        commJoinedTimeStart: "",
      },
      userList: [],
      communityApply: {
        applyUserId: 0,
        applyUserName: "",
        applyCommunity: 0,
        applyReason: "",
        applyTimeStart: "",
        applyTimeEnd: "",
      },
      communityApplyList: [],
      post: {
        title: "",
        status: 2,
        postUserName: "",
        community: 0,
        createTimeStart: "",
        createTimeEnd: "",
      },
      postList: [],
      notice: {
        postUserId: 0,
        postUserName: "",
        title: "",
        content: "",
        status: 0,
      },
      noticeList: [],
      noticeRules: {
        title: [
          {
            required: true,
            message: "请输入公告标题！",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入公告内容！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetForm(formName) {
      const _this = this;
      console.log(11);
      _this.$refs[formName].resetFields();
    },
    loadCommunityInfo() {
      const _this = this;
      select(1, 1, _this.community).then(function (resp) {
        // console.log(resp);
        _this.community = resp.list[0];
      });
    },
    loadCommunityMember() {
      const _this = this;
      selectCommAdmin(
        _this.userPageInfo.pageNum,
        _this.userPageInfo.pageSize,
        _this.community.id,
        _this.user
      ).then(function (resp) {
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].commJoinedTime = dayjs(
            resp.list[i].commJoinedTime
          ).format("YYYY-MM-DD HH:mm:ss");
        }
        _this.userList = resp.list;
        _this.userPageInfo.total = resp.total;
      });
    },
    handleUserCurrentChange(currentPageNum) {
      const _this = this;
      _this.userPageInfo.pageNum = currentPageNum;
      _this.loadCommunityMember();
    },
    loadCommunityApply() {
      const _this = this;
      selectCommApply(
        _this.applyPageInfo.pageNum,
        _this.applyPageInfo.pageSize,
        _this.communityApply
      ).then(function (resp) {
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].applyTime = dayjs(resp.list[i].applyTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.communityApplyList = resp.list;
        _this.applyPageInfo.total = resp.total;
      });
    },
    handleApplyCurrentChange(currentPageNum) {
      const _this = this;
      _this.applyPageInfo.pageNum = currentPageNum;
      _this.loadCommunityApply();
    },
    applyAgree(row) {
      const _this = this;
      row.applyTime = dayjs(row.applyTime).format("YYYY-MM-DDTHH:mm:ss");
      applyAgree(row).then(function (resp) {
        if (resp === true) {
          _this.loadCommunityApply();
          _this.loadCommunityMember();
          ElMessage.success("操作成功！");
        } else {
          _this.loadCommunityApply();
          _this.loadCommunityMember();
          ElMessage.error("操作失败！");
        }
      });
    },
    applyDisagree(row) {
      const _this = this;
      row.applyTime = dayjs(row.applyTime).format("YYYY-MM-DDTHH:mm:ss");
      applyDisagree(row).then(function (resp) {
        if (resp === true) {
          _this.loadCommunityApply();
          _this.loadCommunityMember();
          ElMessage.success("操作成功！");
        } else {
          _this.loadCommunityApply();
          _this.loadCommunityMember();
          ElMessage.error("操作失败！");
        }
      });
    },
    loadCommunityPost() {
      const _this = this;
      selectPostVo(
        _this.postPageInfo.pageNum,
        _this.postPageInfo.pageSize,
        _this.post
      ).then(function (resp) {
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.postList = resp.list;
        _this.postPageInfo.total = resp.total;
      });
    },
    handlePostCurrentChange(currentPageNum) {
      const _this = this;
      _this.postPageInfo.pageNum = currentPageNum;
      _this.loadCommunityPost();
    },
    loadCommunityNotice() {
      const _this = this;
      selectNotice(
        _this.noticePageInfo.pageNum,
        _this.noticePageInfo.pageSize,
        _this.notice
      ).then(function (resp) {
        // console.log(resp);
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].creationDate = dayjs(resp.list[i].creationDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.noticeList = resp.list;
        _this.noticePageInfo.total = resp.total;
      });
    },
    handleNoticeCurrentChange(currentPageNum) {
      const _this = this;
      _this.noticePageInfo.pageNum = currentPageNum;
      _this.loadCommunityNotice();
    },
    postNotice() {
      const _this = this;
      this.$refs["noticeForm"].validate((valid) => {
        if (valid === true) {
          insertNotice(_this.notice).then(function (resp) {
            if (resp === true) {
              ElMessage.success("公告发布成功！");
              _this.notice.title = "";
              _this.notice.content = "";
              _this.loadCommunityNotice();
            }
          });
        }
      });
    },
    changeNoticeStatus(row) {
      const _this = this;
      row.creationDate = dayjs(row.creationDate).format("YYYY-MM-DDTHH:mm:ss");
      updateNotice(row).then(function (resp) {
        if (resp === true) {
          ElMessage.success("修改成功！");
          _this.loadCommunityNotice();
        }
      });
    },
  },
  mounted() {
    const _this = this;
    const communityId = Number(this.$route.path.split("&")[0].split("/")[2]);
    _this.community.id = communityId;
    _this.communityApply.applyCommunity = communityId;
    _this.post.community = communityId;
    _this.notice.community = communityId;
    getLoginUserId().then(function (resp) {
      _this.notice.postUserId = resp;
    });
    this.loadCommunityInfo();
    this.loadCommunityMember();
    this.loadCommunityApply();
    this.loadCommunityPost();
    this.loadCommunityNotice();
  },
};
</script>

<style scoped>
.el-header {
  --el-header-padding: 0 0;
  height: 90px;
}
.el-main {
  padding: 0;
}
.manageCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
