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
                <el-button>发布公告</el-button>
                <el-button>解散社区</el-button>
              </el-tab-pane>
              <el-tab-pane label="社区成员">
                <el-form :inline="true" :model="user" class="demo-form-inline">
                  <el-form-item size="small">
                    <el-input
                      placeholder="用户名"
                      v-model="user.username"
                    ></el-input>
                  </el-form-item>
                  <el-form-item size="small">
                    <el-date-picker
                      v-model="user.commJoinedTimeStart"
                      type="date"
                      placeholder="加入日期从"
                    >
                    </el-date-picker>
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
                    <el-button icon="el-icon-refresh-left" @click="user = {}"
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
                >
                  <el-form-item size="small">
                    <el-input
                      placeholder="用户名"
                      v-model="communityApply.applyUserName"
                    ></el-input>
                  </el-form-item>
                  <el-form-item size="small">
                    <el-date-picker
                      v-model="communityApply.applyTimeStart"
                      type="date"
                      placeholder="申请日期从"
                    >
                    </el-date-picker>
                    --
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
                      @click="communityApply = {}"
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
                <el-table :data="postTableData" style="width: 100%">
                  <el-table-column prop="title" label="标题" width="180" />
                  <el-table-column prop="date" label="发送时间" width="180" />
                  <el-table-column prop="postUser" label="发送者" width="80" />
                  <el-table-column prop="status" label="状态" width="80" />
                  <el-table-column prop="commentNum" label="评论" width="80" />
                  <el-table-column prop="likeNum" label="点赞" width="80" />
                  <el-table-column label="操作">
                    <el-button type="primary">详情</el-button>
                    <el-button type="primary">删除</el-button>
                    <el-button type="primary">精华</el-button>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="公告管理">
                <el-table :data="postTableData" style="width: 100%">
                  <el-table-column prop="title" label="标题" width="180" />
                  <el-table-column prop="date" label="发送时间" width="180" />
                  <el-table-column prop="status" label="状态" width="80" />
                  <el-table-column label="操作">
                    <el-button type="primary">详情</el-button>
                    <el-button type="primary">紧急</el-button>
                    <el-button type="primary">置顶</el-button>
                    <el-button type="primary">删除</el-button>
                  </el-table-column>
                </el-table>
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
import {applyAgree, applyDisagree, selectCommApply} from "@/api/community/communityApply";
import { ElMessage } from "element-plus";
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
        pageSize: 10,
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
    };
  },
  methods: {
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
      return 1;
    },
    loadCommunityNotice() {
      return 1;
    },
  },
  mounted() {
    const _this = this;
    const communityId = Number(this.$route.path.split("&")[0].split("/")[2]);
    _this.community.id = communityId;
    _this.communityApply.applyCommunity = communityId;
    this.loadCommunityInfo();
    this.loadCommunityMember();
    this.loadCommunityApply();
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
